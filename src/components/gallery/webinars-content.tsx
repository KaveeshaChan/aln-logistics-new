"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight, Play, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Reveal } from "@/components/motion/reveal";
import { webinars, type Webinar } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function StatusBadge({ status }: { status: Webinar["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        status === "upcoming"
          ? "bg-emerald-500/10 text-emerald-600"
          : "bg-brand/10 text-brand",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "upcoming" ? "bg-emerald-500" : "bg-brand",
        )}
      />
      {status === "upcoming" ? "Upcoming" : "Recorded"}
    </span>
  );
}

function FeaturedWebinar({ webinar }: { webinar: Webinar }) {
  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-sm lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
          <Image
            src={webinar.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand shadow-lg backdrop-blur">
            <Sparkles size={13} /> Featured
          </span>
          <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play size={24} className="ml-0.5 fill-brand" />
          </span>
        </div>

        <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <StatusBadge status={webinar.status} />
            <span className="text-xs font-medium text-neutral-400">
              {webinar.date}
            </span>
          </div>
          <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-3xl">
            {webinar.title}
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 text-pretty">
            {webinar.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {webinar.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Request recording
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:rotate-45"
              />
            </a>
            <span className="text-xs text-neutral-400">
              Hosted by {webinar.host}
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function WebinarCard({ webinar, index }: { webinar: Webinar; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-brand/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={webinar.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4">
          <StatusBadge status={webinar.status} />
        </span>
        <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-brand opacity-0 shadow-lg transition-all duration-500 group-hover:opacity-100">
          <Play size={18} className="ml-0.5 fill-brand" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-medium text-neutral-400">
          {webinar.date} · {webinar.duration}
        </span>
        <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-brand">
          {webinar.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
          {webinar.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {webinar.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function WebinarsContent() {
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return webinars;
    return webinars.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  const featured = webinars.find((w) => w.featured);
  const gridItems = searching
    ? filtered
    : webinars.filter((w) => !w.featured);

  return (
    <>
      <CategoryTabs active="webinars" />

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {!searching && featured && <FeaturedWebinar webinar={featured} />}

          {/* Controls */}
          <Reveal className="mt-14 flex flex-col gap-4 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight text-neutral-900">
                All sessions
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                {filtered.length} {filtered.length === 1 ? "session" : "sessions"}
                {searching && ` matching "${query}"`}
              </p>
            </div>
            <label className="relative flex h-12 w-full items-center rounded-full border border-black/10 bg-neutral-50 pl-4 transition-colors focus-within:border-brand/40 focus-within:bg-white sm:w-72">
              <Search size={16} className="text-neutral-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search webinars…"
                aria-label="Search webinars"
                className="ml-2.5 w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none"
              />
            </label>
          </Reveal>

          {/* Grid */}
          <div className="mt-8">
            {gridItems.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {gridItems.map((w, i) => (
                    <WebinarCard key={w.id} webinar={w} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <p className="rounded-3xl border border-dashed border-black/10 bg-neutral-50 py-16 text-center text-sm text-neutral-500">
                No webinars match your search.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
