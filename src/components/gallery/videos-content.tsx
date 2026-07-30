"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Reveal } from "@/components/motion/reveal";
import {
  featuredVideos,
  videoClips,
  videoRegions,
  videos,
  type Video,
  type VideoClip,
  type VideoRegion,
} from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
type Filter = "All" | VideoRegion;

function PlayerModal({
  video,
  onClose,
}: {
  video: Video | VideoClip | null;
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
              {"youtubeId" in video && video.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : video.src ? (
                <video
                  src={video.src}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 size-full bg-black object-contain"
                />
              ) : "poster" in video ? (
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
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FeaturedCard({
  video,
  onOpen,
  large,
}: {
  video: Video;
  onOpen: () => void;
  large?: boolean;
}) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative block w-full overflow-hidden rounded-[1.75rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        large
          ? "aspect-[16/10] lg:col-span-2 lg:aspect-[21/10]"
          : "aspect-[16/10] sm:aspect-video",
      )}
      aria-label={`Play ${video.title}`}
    >
      <Image
        src={video.poster}
        alt=""
        fill
        priority={large}
        sizes={
          large
            ? "(min-width: 1024px) 66vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end",
          large ? "p-7 sm:p-10" : "p-5",
        )}
      >
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Featured
        </span>
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "grid shrink-0 place-items-center rounded-full bg-white/95 text-brand shadow-xl transition-transform duration-300 group-hover:scale-110",
              large ? "size-16" : "size-12",
            )}
          >
            <Play size={large ? 26 : 20} className="ml-0.5 fill-brand" />
          </span>
          <div>
            <h2
              className={cn(
                "font-heading font-extrabold tracking-tight text-white text-pretty",
                large ? "text-2xl sm:text-3xl" : "text-base",
              )}
            >
              {video.title}
            </h2>
            <p className="mt-1 text-sm text-white/70">{video.region}</p>
          </div>
        </div>
      </div>
    </motion.button>
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

function ClipCard({
  clip,
  index,
  onOpen,
}: {
  clip: VideoClip;
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
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      aria-label={`Play ${clip.title}`}
    >
      <video
        src={`${clip.src}#t=0.1`}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

      <span className="absolute left-1/2 top-1/2 grid size-13 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
        <Play size={20} className="ml-0.5 fill-brand" />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block font-heading text-sm font-bold text-white text-pretty">
          {clip.title}
        </span>
      </span>
    </motion.button>
  );
}

export function VideosContent() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Video | VideoClip | null>(null);

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
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeaturedCard
              video={featuredVideos[0]}
              onOpen={() => setActive(featuredVideos[0])}
              large
            />
            {featuredVideos.slice(1).map((v) => (
              <FeaturedCard key={v.id} video={v} onOpen={() => setActive(v)} />
            ))}
          </Reveal>

          {/* More clips */}
          <Reveal className="mt-12">
            <h2 className="font-heading text-lg font-extrabold tracking-tight text-neutral-900">
              More from the network
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {videoClips.map((clip, i) => (
                <ClipCard
                  key={clip.id}
                  clip={clip}
                  index={i}
                  onOpen={() => setActive(clip)}
                />
              ))}
            </div>
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
