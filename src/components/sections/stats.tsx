"use client";

import { Counter } from "@/components/motion/counter";
import { Stagger } from "@/components/motion/reveal";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-brand py-16 text-brand-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <Stagger className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <Stagger.Item key={s.label} className="text-center">
            <div className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
          </Stagger.Item>
        ))}
      </Stagger>
    </section>
  );
}
