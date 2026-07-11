"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Accordion } from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { img, objectives, PHOTOS } from "@/lib/site";

export function Objectives() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        {/* Copy + accordion */}
        <div>
          <Reveal>
            <Eyebrow>Our purpose</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Total solutions for a global product"
            highlight={["global"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              An automobile moves across every country. ALN gears members up to
              offer complete solutions to their clients, irrespective of size.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Accordion items={objectives} />
          </Reveal>
        </div>

        {/* Sticky-feel image */}
        <div className="relative">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-brand/10">
              <Image
                src={img(PHOTOS.carCarrier, 900, 70)}
                alt="Car carrier loaded with vehicles"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -left-4 bottom-8 max-w-[13rem] rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur"
          >
            <p className="text-sm font-semibold text-foreground">
              2-wheelers to oversized units
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Road, rail, sea &amp; air — one coordinated network.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
