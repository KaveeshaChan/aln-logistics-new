"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Newspaper } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Reveal } from "@/components/motion/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/** Animated illustration standing in for the (as-yet empty) archive. */
function EmptyIllustration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto mb-10 h-40 w-full max-w-sm">
      {/* stacked "issue" cards */}
      {[2, 1, 0].map((depth) => (
        <motion.div
          key={depth}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: depth * 0.1, ease }}
          className="absolute left-1/2 top-1/2 h-32 w-52 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/5 bg-white shadow-xl"
          style={{
            transform: `translate(-50%, -50%) translateY(${depth * 10}px) scale(${1 - depth * 0.06})`,
            zIndex: 10 - depth,
            opacity: 1 - depth * 0.25,
          }}
        />
      ))}
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 z-20 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-brand text-white shadow-2xl shadow-brand/30"
        style={{ marginTop: "-14px" }}
      >
        <Newspaper size={28} />
      </motion.div>
    </div>
  );
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease }}
        className="flex h-13 items-center justify-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-6 text-sm font-medium text-brand"
      >
        <CheckCircle2 size={18} />
        You&apos;ll be the first to know.
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className="flex h-13 items-center rounded-full border border-black/10 bg-white p-1.5 pl-5 shadow-sm transition-colors focus-within:border-brand/40"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none"
      />
      <button
        type="submit"
        className="group flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        Notify me
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}

export function NewslettersContent() {
  return (
    <>
      <CategoryTabs active="newsletters" />

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <EmptyIllustration />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              <span className="size-1.5 rounded-full bg-brand" />
              Publishing soon
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 text-balance sm:text-4xl">
              No newsletters have been published yet
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-600 text-pretty">
              We&apos;re preparing the first edition — market intelligence,
              member news and conference briefings from across the network.
              Leave your email and we&apos;ll let you know the moment it lands.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mx-auto mt-9 max-w-md">
              <NotifyForm />
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="/gallery"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-brand"
            >
              Explore the rest of the gallery
              <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
