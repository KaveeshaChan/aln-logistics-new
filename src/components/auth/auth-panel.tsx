"use client";

import { motion } from "motion/react";

import { Logo } from "@/components/layout/logo";
import { Counter } from "@/components/motion/counter";
import { stats } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark brand panel shown alongside auth forms — hidden below lg. */
function AuthPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 text-white lg:flex">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-brand/20 blur-[100px]"
      />

      <a href="/" aria-label="ALN home" className="relative w-fit">
        <Logo inverted />
      </a>

      <div className="relative">
        <h2 className="font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-balance">
          One network to move automobiles worldwide
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
          Handpicked freight forwarders and logistics providers in every
          major country that exports and imports automobiles.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-heading text-2xl font-extrabold tracking-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-xs font-medium text-white/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Split card shell shared by the login and signup pages. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease }}
      className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-xl shadow-neutral-200/60 lg:grid-cols-2"
    >
      <AuthPanel />
      <div className="p-6 sm:p-10 lg:p-12">{children}</div>
    </motion.div>
  );
}
