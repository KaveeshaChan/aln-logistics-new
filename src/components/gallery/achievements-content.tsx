"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Reveal } from "@/components/motion/reveal";
import { achievements, type Achievement } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function TimelineNode({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-12">
      {/* connector dot */}
      <span className="absolute left-4 top-6 z-10 grid size-8 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-brand text-[11px] font-bold text-white shadow-lg md:left-1/2">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* card */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease }}
        className={cn(
          "group ml-12 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-brand/10 md:ml-0",
          flip ? "md:col-start-2" : "md:col-start-1",
        )}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={achievement.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        </div>
        <div className="p-6 sm:p-7">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <MapPin size={12} />
            {achievement.location}
          </span>
          <h3 className="mt-3 font-heading text-xl font-extrabold tracking-tight text-neutral-900 transition-colors group-hover:text-brand">
            {achievement.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 text-pretty">
            {achievement.description}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

export function AchievementsContent() {
  return (
    <>
      <CategoryTabs active="achievements" />

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Milestones
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 text-balance sm:text-4xl">
              Delivered across the network
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 text-pretty">
              From armored-vehicle shipments in West Africa to island markets in
              the Pacific, ALN members turn complex automobile logistics into
              milestones worth celebrating.
            </p>
          </Reveal>

          <div className="relative flex flex-col gap-10 sm:gap-14">
            {/* spine */}
            <span
              aria-hidden
              className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand/40 via-black/10 to-transparent md:left-1/2 md:-translate-x-1/2"
            />
            {achievements.map((a, i) => (
              <TimelineNode key={a.id} achievement={a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
