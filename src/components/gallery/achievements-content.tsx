"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { CategoryTabs } from "@/components/gallery/category-tabs";
import { Reveal } from "@/components/motion/reveal";
import { achievements, type Achievement } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function VideoModal({ src, onClose }: { src: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          role="dialog"
          aria-modal="true"
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
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X size={18} />
            </button>
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VideoThumb({
  src,
  label,
  onPlay,
}: {
  src: string;
  label: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${label}`}
      className="group/vid relative aspect-video w-full overflow-hidden rounded-xl bg-black outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <video src={src} muted playsInline preload="metadata" className="size-full object-cover opacity-80" />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors group-hover/vid:bg-ink/50">
        <span className="grid size-11 place-items-center rounded-full bg-white/90 text-brand shadow-lg transition-transform duration-300 group-hover/vid:scale-110">
          <Play size={18} className="ml-0.5 fill-brand" />
        </span>
      </div>
    </button>
  );
}

function TimelineNode({
  achievement,
  index,
  onPlayVideo,
}: {
  achievement: Achievement;
  index: number;
  onPlayVideo: (src: string) => void;
}) {
  const flip = index % 2 === 1;
  const heroImage = achievement.images[0];
  const heroVideo = !heroImage ? achievement.videos[0] : undefined;
  const extraImages = heroImage ? achievement.images.slice(1) : [];
  const extraVideos = heroImage ? achievement.videos : achievement.videos.slice(1);

  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-12">
      <span className="absolute left-4 top-6 z-10 grid size-8 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-brand text-[11px] font-bold text-white shadow-lg md:left-1/2">
        {String(index + 1).padStart(2, "0")}
      </span>

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
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt={achievement.title}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </>
          ) : heroVideo ? (
            <button
              type="button"
              onClick={() => onPlayVideo(heroVideo)}
              aria-label={`Play ${achievement.title} video`}
              className="group/hero relative size-full outline-none"
            >
              <video
                src={heroVideo}
                muted
                playsInline
                preload="metadata"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/40 transition-colors group-hover/hero:bg-ink/55">
                <span className="grid size-16 place-items-center rounded-full bg-white/90 text-brand shadow-xl transition-transform duration-300 group-hover/hero:scale-110">
                  <Play size={26} className="ml-0.5 fill-brand" />
                </span>
              </div>
            </button>
          ) : null}
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

          {(extraImages.length > 0 || extraVideos.length > 0) && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              {extraImages.map((src) => (
                <div
                  key={src}
                  className="relative aspect-video overflow-hidden rounded-xl bg-neutral-100"
                >
                  <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                </div>
              ))}
              {extraVideos.map((src, i) => (
                <VideoThumb
                  key={src}
                  src={src}
                  label={`${achievement.title} field footage ${i + 1}`}
                  onPlay={() => onPlayVideo(src)}
                />
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export function AchievementsContent() {
  const [playing, setPlaying] = useState<string | null>(null);

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
              From armored-vehicle shipments in West Africa to a freight
              station opening in the Pacific, ALN members turn complex
              automobile and equipment logistics into milestones worth
              celebrating.
            </p>
          </Reveal>

          <div className="relative flex flex-col gap-10 sm:gap-14">
            <span
              aria-hidden
              className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand/40 via-black/10 to-transparent md:left-1/2 md:-translate-x-1/2"
            />
            {achievements.map((a, i) => (
              <TimelineNode
                key={a.id}
                achievement={a}
                index={i}
                onPlayVideo={setPlaying}
              />
            ))}
          </div>
        </div>
      </section>

      <VideoModal src={playing} onClose={() => setPlaying(null)} />
    </>
  );
}
