"use client";

import { Fragment, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export interface Crumb {
  label: string;
  href?: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** Soft, drifting shapes behind the hero copy. Skipped when reduced-motion. */
function FloatingShapes() {
  const reduce = useReducedMotion();

  const blobs = [
    { className: "left-[8%] top-[18%] size-64 bg-brand/30", d: 9 },
    { className: "right-[10%] top-[12%] size-72 bg-brand/20", d: 12 },
    { className: "left-[38%] bottom-[6%] size-56 bg-orange-400/20", d: 11 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full blur-[90px]", b.className)}
          animate={
            reduce
              ? undefined
              : { y: [0, -26, 0], x: [0, 14, 0], scale: [1, 1.08, 1] }
          }
          transition={{
            duration: b.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

export function GalleryHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumbs,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  /** Words in the title to paint with the brand gradient. */
  highlight?: string[];
  subtitle: string;
  crumbs: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  const highlightSet = new Set(highlight ?? []);
  const words = title.split(" ");

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink px-5 pt-36 pb-16 text-white sm:px-8 sm:pt-44 sm:pb-20",
        className,
      )}
    >
      <FloatingShapes />
      {/* top + bottom fades for a cinematic frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl"
      >
        {/* Breadcrumb */}
        <motion.nav
          variants={item}
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/45"
        >
          {crumbs.map((c, i) => (
            <Fragment key={c.label}>
              {i > 0 && <span className="text-white/25">/</span>}
              {c.href ? (
                <a
                  href={c.href}
                  className="transition-colors hover:text-brand"
                >
                  {c.label}
                </a>
              ) : (
                <span className="text-white/80">{c.label}</span>
              )}
            </Fragment>
          ))}
        </motion.nav>

        <motion.div variants={item} className="mt-6">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl"
        >
          {words.map((w, i) => {
            const clean = w.replace(/[.,—]/g, "");
            const isHi = highlightSet.has(clean);
            return (
              <span key={`${w}-${i}`} className="inline-block">
                <span
                  className={cn(
                    isHi &&
                      "bg-gradient-to-r from-brand via-orange-400 to-brand bg-clip-text text-transparent",
                  )}
                >
                  {w}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 text-pretty sm:text-lg"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div variants={item} className="mt-9">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
