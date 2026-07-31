"use client";

import Image from "next/image";
import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const points = [
  "Limited, strategically selected members per country, with expanded representation in key automotive markets",
  "Experienced in local & international import/export regulation",
  "Contacts across manufacturers, carriers, customs & government",
  "Shared market intelligence and operational best practice",
];

const collagePhotos = [
  { src: "/gallery/images/DSC_9095.JPG", alt: "ALN members at the ALN Annual Conference 2023" },
  { src: "/gallery/images/DSC_9145.JPG", alt: "An ALN member at the ALN Annual Conference 2023" },
  { src: "/gallery/images/DSC_9220.JPG", alt: "An ALN member at the ALN Annual Conference 2023" },
  { src: "/gallery/images/DSC_9110.JPG", alt: "ALN members at the ALN Annual Conference 2023" },
];

export function About() {
  const collageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"],
  });
  // Gentle counter-scroll parallax as the collage scrolls through view
  const mainY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32 bg-white text-black">
      {/* Soft brand wash behind the collage — keeps the section white overall */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 size-[480px] rounded-full bg-brand/[0.05] blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        {/* Image collage */}
        <div ref={collageRef} className="relative order-2 lg:order-1">
          <Reveal direction="right">
            <motion.div style={{ y: mainY }} className="grid grid-cols-2 gap-4">
              {collagePhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`group relative aspect-square overflow-hidden rounded-2xl shadow-xl shadow-neutral-200/60 ${
                    i % 2 === 1 ? "mt-8" : ""
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 220px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Sheen sweep on hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              ))}
            </motion.div>
          </Reveal>

          {/* <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="absolute -left-12 bottom-70"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur"
            >
              <p className="font-heading text-2xl font-extrabold text-brand">
                <Counter value={15} suffix="K+" />
              </p>
              <p className="text-xs font-medium text-neutral-500">
                Vehicles moved / year
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="absolute -right-2 -bottom-8 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur"
            >
              <p className="font-heading text-2xl font-extrabold text-brand">
                <Counter value={9} />
              </p>
              <p className="text-xs font-medium text-neutral-500">
                Years of trust
              </p>
            </motion.div>
          </motion.div> */}
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
              experienced freight forwarders and logistics providers in each major country that exports and imports automobiles, automotive spare parts, tyres, and related automotive cargo. They cooperate to develop business opportunities and deliver complete, end-to-end solutions at low cost with a high return.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {points.map((point, i) => (
              <Reveal as="li" key={point} delay={0.15 + i * 0.08}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors duration-300 hover:border-brand/15 hover:bg-brand/[0.04]"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-neutral-800">
                    {point}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button
                nativeButton={false}
                size="lg"
                className="group h-12 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/25"
                render={<a href="#membership" />}
              >
                Become a Member
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <HugeiconsIcon icon={ArrowRight01Icon} />
                </span>
              </Button>
              <a
                href="#services"
                className="group text-sm font-semibold text-neutral-700 transition-colors hover:text-brand"
              >
                Explore our services
                <span className="block h-px max-w-0 bg-brand transition-all duration-500 group-hover:max-w-full" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
