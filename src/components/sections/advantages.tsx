"use client";

import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { advantages } from "@/lib/site";

function AdvantageCard({
  adv,
  index,
}: {
  adv: (typeof advantages)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(255,107,0,0.14), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors duration-500 hover:border-brand/40"
    >
      {/* Cursor-tracking spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Top accent line draws in on hover */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand via-brand/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      {/* Oversized ghost number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-3 font-heading text-7xl font-extrabold text-foreground/[0.04] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brand/10"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <div className="relative inline-grid">
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-brand/40 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-70"
          />
          <motion.span
            whileHover={{ rotate: -6, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative grid size-12 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-lg shadow-brand/25"
          >
            <HugeiconsIcon icon={adv.icon} size={24} />
          </motion.span>
        </div>

        <h3 className="mt-5 font-heading text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-brand">
          {adv.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
          {adv.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Advantages() {
  return (
    <section className="relative overflow-hidden bg-muted/40 py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Why choose us</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="A network built on trust, coverage and expertise"
            highlight={["trust,", "expertise"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl"
          />
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv, i) => (
            <Stagger.Item key={adv.title} className="h-full">
              <AdvantageCard adv={adv} index={i} />
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
