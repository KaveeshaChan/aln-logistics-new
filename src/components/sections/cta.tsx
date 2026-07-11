"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section id="membership" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-brand px-6 py-16 text-center text-brand-foreground shadow-2xl shadow-brand/20 sm:px-16 sm:py-20">
        {/* decorative shapes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold/30 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-white/20 blur-3xl"
        />

        <div className="relative">
          <Reveal className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              <span className="size-1.5 rounded-full bg-gold" />
              Join the network
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text="Be the ALN partner in your country"
            highlight={["ALN", "partner"]}
            className="mx-auto mt-6 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-white text-balance sm:text-5xl"
          />

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              You may be the right partner in your market to enjoy the benefits,
              grow your business and become a successful stakeholder in our
              group. We guarantee you&apos;ll be delighted.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full bg-gold px-7 text-sm font-semibold text-gold-foreground hover:bg-gold/90"
                render={<a href={`mailto:${site.email}`} />}
              >
                Apply for Membership
                <HugeiconsIcon icon={ArrowRight01Icon} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/30 bg-transparent px-7 text-sm font-semibold text-white hover:bg-white/15 hover:text-white"
                render={<a href={`mailto:${site.email}`} />}
              >
                <HugeiconsIcon icon={Mail01Icon} />
                {site.email}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
