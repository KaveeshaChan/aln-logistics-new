"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Role = "Admin" | "User";
export type AuthUser = { id: number; username: string; role: Role };

type LoginResult = { ok: true } | { ok: false; error: string };

type AuthState = {
  user: AuthUser | null;
  /** True until the initial /api/me.php check resolves. */
  loading: boolean;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

/**
 * This is a static export — there's no server-rendered layout to carry auth
 * state between pages, so every page mount re-checks /api/me.php (the
 * session cookie makes that call authoritative either way).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/me.php", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setUser(data?.user ?? null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<LoginResult> => {
    try {
      const res = await fetch("/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        return { ok: false, error: data.error ?? "Login failed." };
      }
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error — please try again." };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/logout.php", { method: "POST", credentials: "same-origin" });
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
