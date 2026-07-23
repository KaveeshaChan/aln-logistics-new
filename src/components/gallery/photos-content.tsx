"use client";

import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Lightbox } from "@/components/gallery/lightbox";
import { Reveal } from "@/components/motion/reveal";
import { photoAlbums, photos, type PhotoAlbum } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
type Filter = "All" | PhotoAlbum;

export function PhotosContent() {
  const [filter, setFilter] = useState<Filter>("All");
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? photos : photos.filter((p) => p.album === filter)),
    [filter],
  );

  const lightboxItems = visible.map((p) => ({
    full: p.full,
    caption: p.caption,
  }));

  const filters: Filter[] = ["All", ...photoAlbums];

  return (
    <>
      <CategoryTabs active="photos" />

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Album filter */}
          <Reveal className="mb-8 flex flex-wrap items-center gap-2">
            {filters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                    isActive
                      ? "text-white"
                      : "text-neutral-500 hover:bg-black/5 hover:text-neutral-900",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="photo-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                    />
                  )}
                  {f}
                </button>
              );
            })}
            <span className="ml-auto text-xs font-medium text-neutral-400">
              {visible.length} photos
            </span>
          </Reveal>

          {/* Masonry */}
          <motion.div
            layout
            className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4"
          >
            <AnimatePresence>
              {visible.map((p, i) => (
                <motion.button
                  key={p.id}
                  layout
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.04, ease }}
                  aria-label={`Open “${p.caption}”`}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  {/* skeleton */}
                  {!loaded[p.id] && (
                    <div className="aspect-[4/5] w-full animate-pulse bg-neutral-200" />
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    onLoad={() =>
                      setLoaded((prev) => ({ ...prev, [p.id]: true }))
                    }
                    className={cn(
                      "w-full object-cover transition-all duration-700 group-hover:scale-105",
                      loaded[p.id] ? "block" : "hidden",
                    )}
                  />
                  {/* hover overlay */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-white text-pretty">
                        {p.caption}
                      </span>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                        <Maximize2 size={14} />
                      </span>
                    </span>
                    <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/60">
                      {p.album}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
