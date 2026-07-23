"use client";

import { motion } from "motion/react";

import { galleryCategories, type GallerySlug } from "@/lib/gallery";
import { cn } from "@/lib/utils";

/**
 * Sticky sub-navigation shown across every gallery page so visitors can move
 * between categories without returning to the hub. Active tab uses a shared
 * layout pill; the row scrolls horizontally on small screens.
 */
export function CategoryTabs({ active }: { active: GallerySlug }) {
  return (
    <div className="sticky top-20 z-30 -mt-7 pb-2 sm:top-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <nav
          aria-label="Gallery categories"
          className="no-scrollbar mx-auto flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full border border-black/5 bg-white/80 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl"
        >
          <a
            href="/gallery"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900"
          >
            All
          </a>
          {galleryCategories.map((cat) => {
            const isActive = cat.slug === active;
            const Icon = cat.icon;
            return (
              <a
                key={cat.slug}
                href={cat.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  isActive
                    ? "text-white"
                    : "text-neutral-500 hover:bg-black/5 hover:text-neutral-900",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-tab-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-brand shadow-sm shadow-brand/30"
                  />
                )}
                <span className="flex items-center gap-1.5">
                  <Icon size={14} strokeWidth={2.2} />
                  {cat.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
