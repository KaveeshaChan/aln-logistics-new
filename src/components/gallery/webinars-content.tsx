"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Images, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Lightbox, type LightboxItem } from "@/components/gallery/lightbox";
import { Reveal } from "@/components/motion/reveal";
import { webinars, type Webinar } from "@/lib/gallery";

const ease = [0.22, 1, 0.36, 1] as const;

function webinarLightboxItems(webinar: Webinar): LightboxItem[] {
  return webinar.images.map((img) => ({
    full: img.src,
    caption: `${webinar.title} — ${img.label}`,
  }));
}

function FeaturedWebinar({
  webinar,
  onOpen,
}: {
  webinar: Webinar;
  onOpen: (index: number) => void;
}) {
  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-sm lg:grid-cols-2">
        <button
          type="button"
          onClick={() => onOpen(0)}
          aria-label={`View ${webinar.title} flyer full-size`}
          className="relative aspect-[16/10] overflow-hidden outline-none lg:aspect-auto"
        >
          <Image
            src={webinar.images[0].src}
            alt={`${webinar.title} — ${webinar.images[0].label}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent lg:bg-gradient-to-r" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand shadow-lg backdrop-blur">
            <Sparkles size={13} /> Featured
          </span>
          {webinar.images.length > 1 && (
            <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
              <Images size={13} /> {webinar.images.length} images
            </span>
          )}
        </button>

        <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
          <span className="text-xs font-medium text-neutral-400">
            {webinar.date}
          </span>
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
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {webinar.images.map((im, i) => (
              <button
                key={im.label}
                type="button"
                onClick={() => onOpen(i)}
                className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-brand/40 hover:text-brand"
              >
                View {im.label}
              </button>
            ))}
            <span className="text-xs text-neutral-400">
              Hosted by {webinar.host}
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function WebinarCard({
  webinar,
  index,
  onOpen,
}: {
  webinar: Webinar;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-brand/10"
    >
      <button
        type="button"
        onClick={() => onOpen(0)}
        aria-label={`View ${webinar.title} full-size`}
        className="relative aspect-[16/10] overflow-hidden outline-none"
      >
        <Image
          src={webinar.images[0].src}
          alt={`${webinar.title} — ${webinar.images[0].label}`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand shadow backdrop-blur">
          {webinar.date}
        </span>
        {webinar.images.length > 1 && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
            <Images size={11} /> {webinar.images.length}
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col gap-3 p-6">
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
  const [active, setActive] = useState<Webinar | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
  const gridItems = searching ? filtered : webinars.filter((w) => !w.featured);

  const openWebinar = (webinar: Webinar, index: number) => {
    setActive(webinar);
    setLightboxIndex(index);
  };

  return (
    <>
      <CategoryTabs active="webinars" />

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {!searching && featured && (
            <FeaturedWebinar
              webinar={featured}
              onOpen={(i) => openWebinar(featured, i)}
            />
          )}

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
                    <WebinarCard
                      key={w.id}
                      webinar={w}
                      index={i}
                      onOpen={(idx) => openWebinar(w, idx)}
                    />
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

      <Lightbox
        items={active ? webinarLightboxItems(active) : []}
        index={active ? lightboxIndex : null}
        onIndexChange={setLightboxIndex}
        onClose={() => setActive(null)}
      />
    </>
  );
}
