"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { advantages } from "@/lib/site";

export function Advantages() {
  return (
    <section className="relative overflow-hidden bg-muted/40 py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
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
          {advantages.map((adv) => (
            <Stagger.Item key={adv.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-brand/30"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-lg shadow-brand/20 transition-transform duration-300 group-hover:scale-105">
                  <HugeiconsIcon icon={adv.icon} size={24} />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                  {adv.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {adv.description}
                </p>
              </motion.div>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
