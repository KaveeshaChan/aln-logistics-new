"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

export type Role = "Admin" | "User";
export type AuthUser = { id: string; username: string; role: Role };

type LoginResult = { ok: true } | { ok: false; error: string };

type AuthState = {
  user: AuthUser | null;
  /** True until the initial session check resolves. */
  loading: boolean;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

const GENERIC_LOGIN_ERROR = "Invalid username or password.";

/** Fetches the profiles row (username, role) for a signed-in Supabase user. */
async function loadProfile(userId: string): Promise<AuthUser | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("username, role")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return { id: userId, username: data.username, role: data.role as Role };
}

/**
 * Supabase persists the session in localStorage and attaches it to every
 * request automatically, so — unlike the old PHP-session version — pages
 * don't need to hit the network just to check "is there a session at all".
 * We still re-fetch the profile row on mount, since that's the authoritative
 * source for the role and is enforced server-side by RLS regardless.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const profile = session ? await loadProfile(session.user.id) : null;
      if (!cancelled) {
        setUser(profile);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const profile = session ? await loadProfile(session.user.id) : null;
      if (!cancelled) setUser(profile);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<LoginResult> => {
    try {
      const { data: email, error: lookupError } = await supabase.rpc("get_email_for_username", {
        p_username: username,
      });
      if (lookupError || !email) {
        return { ok: false, error: GENERIC_LOGIN_ERROR };
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        return { ok: false, error: GENERIC_LOGIN_ERROR };
      }

      const profile = await loadProfile(data.user.id);
      if (!profile) {
        return { ok: false, error: GENERIC_LOGIN_ERROR };
      }

      setUser(profile);
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error — please try again." };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
