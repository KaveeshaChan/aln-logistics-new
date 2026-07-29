"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

export function BenefitsHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">Benefits</span>
        </Reveal>

        <div className="mt-6 max-w-3xl">
          <Reveal delay={0.05}>
            <Eyebrow>Member benefits</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="Why members choose to stay in the network"
            highlight={["network"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Strategic market representation, shared business opportunities, and a proven track record — here is what membership delivers.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
