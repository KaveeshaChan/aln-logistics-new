"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { heroSlides, img, PHOTOS, stats } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6000;

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35, ease } },
};

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease } },
  exit: { y: "-110%", opacity: 0, transition: { duration: 0.35, ease } },
};

export function Hero() {
  const [index, setIndex] = useState(0);
  const nextIndex = (index + 1) % heroSlides.length;
  const slide = heroSlides[index];

  const sectionRef = useRef<HTMLElement>(null);

  // Content drifts up and fades as the visitor scrolls past the hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 0.7], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Subtle mouse parallax — background leans toward the cursor, copy leans away
  const mouseX = useSpring(useMotionValue(0), { stiffness: 45, damping: 18 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 45, damping: 18 });
  const bgX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const copyX = useTransform(mouseX, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={(e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background crossfade with mouse + scroll parallax */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-6 -z-10 bg-ink"
      >
        <motion.div style={{ y: bgScrollY }} className="absolute inset-0">
          <AnimatePresence>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{
                  duration: AUTOPLAY_MS / 1000 + 1.3,
                  ease: "linear",
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.heading}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand/60 via-brand/30 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-brand/20" />
      </motion.div>

      {/* Vertical slide indicators, left edge */}
      <div className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-5 sm:flex sm:left-8">
        {heroSlides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group flex cursor-pointer items-center gap-3"
          >
            <span
              className={`font-heading text-xs font-bold tabular-nums transition-colors duration-300 ${
                i === index ? "text-white" : "text-white/40 group-hover:text-white/70"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative h-px w-10 overflow-hidden rounded-full bg-white/25 transition-all duration-500 group-hover:bg-white/40">
              {i === index && (
                <motion.span
                  key={index}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left rounded-full bg-gold"
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity, x: copyX }}
        className="mx-auto w-full max-w-5xl px-5 pt-32 pb-24 sm:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={copyContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col items-center"
            >
              <motion.div variants={copyItem} className="flex justify-center">
                <Eyebrow tone="light">{slide.kicker}</Eyebrow>
              </motion.div>

              <motion.h1
                variants={wordContainer}
                className="mt-6 max-w-3xl font-heading text-5xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl"
              >
                {slide.heading.split(" ").map((w, i) => (
                  <span
                    key={`${index}-${i}`}
                    className="mr-[0.28em] inline-block overflow-hidden pb-1 align-bottom"
                  >
                    <motion.span variants={word} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.div
                variants={copyItem}
                className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Button
                    nativeButton={false}
                    size="lg"
                    className="group h-12 rounded-full bg-brand px-8 text-sm font-semibold text-white hover:bg-brand/90 shadow-lg shadow-brand/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/35"
                    render={<a href="#membership" />}
                  >
                    Join Now
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <HugeiconsIcon icon={ArrowRight01Icon} />
                    </span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Button
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-8 text-sm font-semibold text-white hover:bg-black/60 hover:text-white transition-colors duration-300 hover:border-white/40"
                    render={<a href="#contact" />}
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Trust chip, bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.7, delay: 0.6, ease }}
        className="absolute bottom-6 left-5 hidden items-center gap-3 rounded-xl border border-white/15 bg-white px-4 py-3 shadow-xl backdrop-blur-xl sm:flex sm:left-8"
      >
        <AvatarGroup>
          {[PHOTOS.carSingle, PHOTOS.truck, PHOTOS.shipRamp].map((p) => (
            <Avatar key={p} className="ring-2 ring-ink/40">
              <AvatarImage src={img(p, 80, 40)} alt="" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount className="ring-2 ring-ink/40">
            +
          </AvatarGroupCount>
        </AvatarGroup>
        <div>
          <p className="text-sm text-black font-semibold">
            {stats[1].value}
            {stats[1].suffix} Partners
          </p>
          <p className="text-xs text-black/60">Trusted worldwide</p>
        </div>
      </motion.div>

      {/* Scroll cue, bottom-center */}
      <motion.a
        href="#about"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{ opacity: copyOpacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
          Scroll
        </span>
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border border-white/30 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block size-1.5 rounded-full bg-gold"
          />
        </span>
      </motion.a>

      {/* Next-slide preview, bottom-right */}
      <motion.button
        type="button"
        onClick={() => setIndex(nextIndex)}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.7, delay: 0.7, ease }}
        className="group absolute bottom-6 right-5 hidden w-48 cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-white p-2.5 text-left shadow-xl backdrop-blur-xl sm:block sm:right-8"
        aria-label="Show next slide"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={heroSlides[nextIndex].image}
            alt={heroSlides[nextIndex].heading}
            fill
            sizes="192px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold text-gold-foreground">
            Next
          </span>
        </div>
        <p className="mt-2 line-clamp-1 text-xs font-medium text-black">
          {heroSlides[nextIndex].kicker}
        </p>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/10">
          <motion.div
            key={index}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            className="h-full rounded-full bg-gold"
          />
        </div>
      </motion.button>

      {/* Slide dots (mobile) */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:hidden">
        {heroSlides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1.5 overflow-hidden rounded-full"
          >
            <span
              className={`block h-full rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-white/30" : "w-1.5 bg-white/40"
              }`}
            />
            {i === index && (
              <motion.span
                key={index}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                className="absolute inset-0 origin-left rounded-full bg-gold"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
