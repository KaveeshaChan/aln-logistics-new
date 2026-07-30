"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

import { NetworkMembersTable } from "@/components/admin/network-members-table";
import { useAuth } from "@/lib/auth-context";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Static export has no server to gate this page, so the redirect happens
 * client-side after the /api/me.php session check resolves — the page's
 * HTML shell always loads, this component decides what to show inside it.
 */
export function AccountContent() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login/";
    }
  }, [loading, user]);

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

  // Admin and User share this same view — the table itself decides what to
  // show based on readOnly (Add Member button, edit/delete actions).
  const isAdmin = user.role === "Admin";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="w-full"
    >
      <h3 className="mb-4 font-heading text-xl font-extrabold tracking-tight text-neutral-900">
        Network Members
      </h3>
      <NetworkMembersTable readOnly={!isAdmin} />
    </motion.div>
  );
}
