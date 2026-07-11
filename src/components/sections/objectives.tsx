"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { img, objectives, PHOTOS } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function ObjectiveItem({
  index,
  title,
  body,
  open,
  onToggle,
}: {
  index: number;
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease } }}
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-500",
        open
          ? "border-brand/25 bg-white shadow-lg shadow-brand/[0.07]"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-200/60",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center gap-4 px-5 py-4.5 text-left outline-none"
      >
        <span
          className={cn(
            "font-heading text-sm font-bold tabular-nums transition-colors duration-300",
            open ? "text-brand" : "text-neutral-300 group-hover:text-neutral-500",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 font-heading text-base font-semibold transition-all duration-300 sm:text-lg",
            open
              ? "text-neutral-900"
              : "text-neutral-600 group-hover:translate-x-1 group-hover:text-neutral-900",
          )}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease }}
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300",
            open
              ? "bg-brand text-white shadow-md shadow-brand/30"
              : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200",
          )}
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="border-l-2 border-brand/60 px-5 pb-5 ml-[1.35rem] pl-[1.55rem] text-sm leading-relaxed text-neutral-600"
            >
              {body}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Objectives() {
  const [open, setOpen] = useState<number | null>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const chipY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section className="relative overflow-hidden bg-white py-24 text-black sm:py-32">
      {/* Faint brand wash, keeps the section white overall */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 size-[460px] rounded-full bg-brand/[0.05] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        {/* Copy + accordion */}
        <div>
          <Reveal>
            <Eyebrow>Our purpose</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Total solutions for a global product"
            highlight={["global"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              An automobile moves across every country. ALN gears members up to
              offer complete solutions to their clients, irrespective of size.
            </p>
          </Reveal>

          <div className="mt-9 flex flex-col gap-3">
            {objectives.map((item, i) => (
              <Reveal key={item.title} delay={0.15 + i * 0.08}>
                <ObjectiveItem
                  index={i}
                  title={item.title}
                  body={item.body}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Parallax image */}
        <div ref={imageRef} className="relative">
          <Reveal direction="left">
            <motion.div style={{ y: imageY }}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-neutral-200/70">
                <Image
                  src={img(PHOTOS.carCarrier, 900, 70)}
                  alt="Car carrier loaded with vehicles"
                  fill
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Sheen sweep on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
          </Reveal>

          <motion.div
            style={{ y: chipY }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="absolute -left-4 bottom-10"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="max-w-[14rem] rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-xl backdrop-blur"
            >
              <p className="text-sm font-semibold text-neutral-900">
                2-wheelers to oversized units
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Road, rail, sea &amp; air — one coordinated network.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
