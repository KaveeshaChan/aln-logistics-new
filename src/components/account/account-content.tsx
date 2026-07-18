"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Logout03Icon,
  ShieldUserIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function AccountHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">Member Account</span>
        </Reveal>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <Reveal delay={0.05} className="flex justify-center">
            <Eyebrow>Members Area</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="Your ALN member account"
            highlight={["member", "account"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-5xl"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Static export has no server to gate this page, so the redirect happens
 * client-side after the /api/me.php session check resolves — the page's
 * HTML shell always loads, this component decides what to show inside it.
 */
export function AccountContent() {
  const { user, loading, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login/";
    }
  }, [loading, user]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    window.location.href = "/login/";
  };

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="animate-pulse rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-xl shadow-neutral-200/60">
          <div className="h-6 w-40 rounded-full bg-neutral-100" />
          <div className="mt-4 h-4 w-64 rounded-full bg-neutral-100" />
          <div className="mt-8 h-12 w-full rounded-full bg-neutral-100" />
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "Admin";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease }}
      className="mx-auto max-w-xl rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-200/60 sm:p-10"
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "grid size-14 shrink-0 place-items-center rounded-full",
            isAdmin ? "bg-brand/10 text-brand" : "bg-neutral-100 text-neutral-500",
          )}
        >
          <HugeiconsIcon icon={isAdmin ? ShieldUserIcon : UserIcon} size={26} />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-neutral-900">
            Welcome, {user.username}
          </h2>
          <span
            className={cn(
              "mt-1 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
              isAdmin
                ? "bg-brand/10 text-brand"
                : "bg-neutral-100 text-neutral-600",
            )}
          >
            {user.role}
          </span>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-neutral-600">
        {isAdmin
          ? "You're signed in with administrator access to the ALN member portal."
          : "You're signed in with member access to the ALN member portal."}
      </p>

      <motion.button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        whileHover={loggingOut ? undefined : { scale: 1.02, y: -2 }}
        whileTap={loggingOut ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="group mt-8 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition-colors duration-300 hover:border-neutral-300 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loggingOut ? "Logging out..." : "Log out"}
        <HugeiconsIcon icon={Logout03Icon} size={16} />
      </motion.button>
    </motion.div>
  );
}
