"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { img, PHOTOS } from "@/lib/site";

const points = [
  "One qualified member per country — no internal competition",
  "Experienced in local & international import/export regulation",
  "Contacts across manufacturers, carriers, customs & government",
  "Shared market intelligence and operational best practice",
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28 bg-white text-black">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        {/* Image collage */}
        <div className="relative order-2 lg:order-1">
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-neutral-200/50">
              <Image
                src={img(PHOTOS.shipRamp, 900, 70)}
                alt="Vehicles being driven onto a RoRo vessel"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 -right-2 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:w-56"
          >
            <div className="relative aspect-square">
              <Image
                src={img(PHOTOS.carSingle, 500, 60)}
                alt="A single vehicle prepared for transport"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="absolute -left-3 top-6 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-lg">
            <p className="font-heading text-2xl font-extrabold text-brand">
              15K+
            </p>
            <p className="text-xs text-neutral-500 font-medium">Vehicles moved / year</p>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>About ALN</Eyebrow>
          </Reveal>

          <TextReveal
            as="h2"
            text="Handpicked partners for the automobile logistics industry"
            highlight={["Handpicked", "automobile"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />

          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              The Automobile Logistics Network membership consists of qualified,
              experienced freight forwarders and logistics providers in each
              major country that exports and imports automobiles. They cooperate
              to develop business opportunities and deliver complete, end-to-end
              solutions at low cost with a high return.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {points.map((point, i) => (
              <Reveal as="li" key={point} delay={0.15 + i * 0.08}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-neutral-800">
                    {point}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
