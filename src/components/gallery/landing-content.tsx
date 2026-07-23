"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { GalleryHero } from "@/components/gallery/gallery-hero";
import { Reveal } from "@/components/motion/reveal";
import { galleryCategories, type GalleryCategory } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Bento spans: three cards up top, two wider cards below.
const spanByIndex = [
  "md:col-span-1 lg:col-span-2",
  "md:col-span-1 lg:col-span-2",
  "md:col-span-2 lg:col-span-2",
  "md:col-span-1 lg:col-span-3",
  "md:col-span-1 lg:col-span-3",
];

function CategoryCard({
  category,
  index,
}: {
  category: GalleryCategory;
  index: number;
}) {
  const reduce = useReducedMotion();
  const Icon = category.icon;

  return (
    <motion.a
      href={category.href}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      whileHover={reduce ? undefined : { y: -6 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm outline-none transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/10 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        spanByIndex[index],
      )}
    >
      {/* glowing border on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-brand/30"
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={category.cover}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-2xl bg-white/95 text-brand shadow-lg shadow-black/10 backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon size={20} strokeWidth={2.2} />
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur">
          {category.count}
        </span>

        <p className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.14em] text-white/80">
          {category.tagline}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-xl font-extrabold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-brand">
            {category.label}
          </h3>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-500 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 text-pretty">
          {category.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowUpRight size={13} />
          </span>
        </span>
      </div>
    </motion.a>
  );
}

export function GalleryLanding() {
  return (
    <>
      <GalleryHero
        eyebrow="The ALN Gallery"
        title="A window into the network"
        highlight={["window"]}
        subtitle="Explore our journey through webinars, events, achievements, photos, videos, and publications — a growing archive of everything happening across the Automobile Logistics Network."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      >
        <div className="flex flex-wrap gap-2.5">
          {galleryCategories.map((c) => (
            <a
              key={c.slug}
              href={c.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition-colors hover:border-brand/50 hover:bg-brand/10 hover:text-white"
            >
              <c.icon size={14} strokeWidth={2.2} className="text-brand" />
              {c.label}
            </a>
          ))}
        </div>
      </GalleryHero>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 flex flex-col gap-3 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Browse by category
            </p>
            <h2 className="max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-neutral-900 text-balance sm:text-4xl">
              Five ways to explore the ALN story
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
            {galleryCategories.map((category, i) => (
              <CategoryCard key={category.slug} category={category} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
