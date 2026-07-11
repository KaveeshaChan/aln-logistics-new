"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Cta() {
  return (
    <section id="membership" className="bg-white px-5 py-24 text-black sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand via-brand to-brand-muted px-6 py-16 text-center text-brand-foreground shadow-2xl shadow-brand/25 sm:px-16 sm:py-20"
      >
        {/* Decorative dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Breathing glow orbs */}
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/25 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="pointer-events-none absolute -bottom-20 -left-16 size-72 rounded-full bg-white/20 blur-3xl"
        />
        {/* Slow diagonal sheen drifting across the card */}
        <motion.div
          aria-hidden
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 3,
          }}
          className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="relative">
          <Reveal className="flex justify-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-white" />
              </span>
              Join the network
            </motion.span>
          </Reveal>

          <TextReveal
            as="h2"
            text="Be the ALN partner in your country"
            highlight={["ALN", "partner"]}
            highlightClassName="text-ink"
            className="mx-auto mt-6 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-white text-balance sm:text-5xl"
          />

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              You may be the right partner in your market to enjoy the benefits,
              grow your business and become a successful stakeholder in our
              group. We guarantee you&apos;ll be delighted.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <Button
                  nativeButton={false}
                  size="lg"
                  className="group h-12 rounded-full bg-white px-8 text-sm font-semibold text-brand shadow-lg shadow-black/10 transition-shadow duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/15"
                  render={<a href={`mailto:${site.email}`} />}
                >
                  Apply for Membership
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <HugeiconsIcon icon={ArrowRight01Icon} />
                  </span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <Button
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/40 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-white/70 hover:bg-white/15 hover:text-white"
                  render={<a href={`mailto:${site.email}`} />}
                >
                  <HugeiconsIcon icon={Mail01Icon} />
                  {site.email}
                </Button>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
              42+ member countries · One partner per market · Protected leads
            </p>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
