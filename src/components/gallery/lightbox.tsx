"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface LightboxItem {
  full: string;
  caption: string;
}

/**
 * Accessible fullscreen image viewer.
 * Keyboard: ← → to page, Esc to close. Touch: swipe left/right. Click the
 * image to toggle zoom; click the backdrop to dismiss. Scroll is locked while
 * open and focus is moved into the dialog.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      setZoomed(false);
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  // Keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Scroll lock + move focus in
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-xl"
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-5 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums text-white/70">
              {(index ?? 0) + 1} / {items.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stage */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            {/* Prev / next */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-2 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-brand sm:left-5"
            >
              <ChevronLeft size={22} />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={current.full}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full max-w-full flex-col items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.full}
                  alt={current.caption}
                  onClick={() => setZoomed((z) => !z)}
                  className={cn(
                    "max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-transform duration-300",
                    zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in",
                  )}
                />
                <figcaption className="mt-4 flex items-center gap-2 text-center text-sm text-white/70">
                  <ZoomIn size={14} className="text-white/40" />
                  {current.caption}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-2 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-brand sm:right-5"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div
            className="no-scrollbar flex items-center justify-start gap-2 overflow-x-auto px-5 py-4 sm:justify-center sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((it, i) => (
              <button
                key={it.full + i}
                type="button"
                onClick={() => {
                  setZoomed(false);
                  onIndexChange(i);
                }}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand",
                  i === index
                    ? "ring-2 ring-brand"
                    : "opacity-50 hover:opacity-100",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.full}
                  alt=""
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
