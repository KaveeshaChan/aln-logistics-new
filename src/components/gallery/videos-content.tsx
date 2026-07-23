"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Reveal } from "@/components/motion/reveal";
import { videoRegions, videos, type Video, type VideoRegion } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
type Filter = "All" | VideoRegion;

function PlayerModal({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-5 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-video">
              {video.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <>
                  <Image
                    src={video.poster}
                    alt=""
                    fill
                    sizes="768px"
                    className="object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                    <span className="grid size-14 place-items-center rounded-full bg-brand/20 text-brand">
                      <Play size={24} className="ml-0.5 fill-brand" />
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {video.title}
                    </h3>
                    <p className="max-w-sm text-sm text-white/60">
                      This clip is being re-mastered for the new gallery.
                      Contact the network to request the full recording.
                    </p>
                    <a
                      href="/contact"
                      className="mt-1 inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white"
                    >
                      Request video
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VideoCard({
  video,
  index,
  onOpen,
}: {
  video: Video;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease }}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      aria-label={`Play ${video.title}`}
    >
      <Image
        src={video.poster}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

      <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur">
        {video.region}
      </span>

      <span className="absolute left-1/2 top-1/2 grid size-13 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
        <Play size={20} className="ml-0.5 fill-brand" />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block font-heading text-sm font-bold text-white text-pretty">
          {video.title}
        </span>
      </span>
    </motion.button>
  );
}

export function VideosContent() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Video | null>(null);

  const featured = videos.find((v) => v.featured) ?? videos[0];

  const visible = useMemo(
    () => (filter === "All" ? videos : videos.filter((v) => v.region === filter)),
    [filter],
  );

  const filters: Filter[] = ["All", ...videoRegions];

  return (
    <>
      <CategoryTabs active="videos" />

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Featured */}
          <Reveal>
            <button
              type="button"
              onClick={() => setActive(featured)}
              className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:aspect-[21/9]"
            >
              <Image
                src={featured.poster}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10">
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Featured film
                </span>
                <div className="flex items-center gap-4">
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white/95 text-brand shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <Play size={26} className="ml-0.5 fill-brand" />
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-1 text-sm text-white/70">
                      {featured.region} · Network highlight
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>

          {/* Region filter */}
          <Reveal className="mt-12 mb-8 flex flex-wrap items-center gap-2">
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
                      layoutId="video-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                    />
                  )}
                  {f}
                </button>
              );
            })}
            <span className="ml-auto text-xs font-medium text-neutral-400">
              {visible.length} videos
            </span>
          </Reveal>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((v, i) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  index={i}
                  onOpen={() => setActive(v)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <PlayerModal video={active} onClose={() => setActive(null)} />
    </>
  );
}
