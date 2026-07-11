"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { img, PHOTOS } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={img(PHOTOS.heroPort, 2000, 70)}
          alt="Aerial view of an automobile shipping port"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-ink/80 to-brand/60" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_10%,transparent,rgba(10,15,40,0.85))]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur"
          >
            <span className="grid size-4 place-items-center rounded-full bg-gold text-gold-foreground">
              <HugeiconsIcon icon={GlobalIcon} size={11} />
            </span>
            A global automobile logistics network
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 max-w-2xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
          >
            The reliable logistics network{" "}
            <span className="text-gold">automakers</span> count on.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            ALN unites handpicked freight forwarders in every major country that
            imports and exports vehicles — delivering end-to-end automobile
            logistics by sea, road, rail and air at low cost with a high return.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="h-12 rounded-full bg-gold px-6 text-sm font-semibold text-gold-foreground hover:bg-gold/90"
              render={<a href="#contact" />}
            >
              Get in Touch
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/25 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/15 hover:text-white"
              render={<a href="#services" />}
            >
              Explore Services
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70"
          >
            {["One partner per country", "Vetted specialists", "Door-to-door coverage"].map(
              (f) => (
                <li key={f} className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={18}
                    className="text-gold"
                  />
                  {f}
                </li>
              ),
            )}
          </motion.ul>
        </motion.div>

        {/* Floating spotlight card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="relative mx-auto w-full max-w-sm lg:mx-0"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={img(PHOTOS.carLoading, 800, 70)}
                alt="Vehicles being loaded for shipping"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-gold-foreground">
                Next-level freight forwarding
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  RoRo &amp; Container
                </p>
                <p className="text-xs text-white/60">Origin to destination</p>
              </div>
              <div className="flex -space-x-2">
                {[PHOTOS.carSingle, PHOTOS.truck, PHOTOS.shipRamp].map((p) => (
                  <span
                    key={p}
                    className="relative size-8 overflow-hidden rounded-full border-2 border-ink/60"
                  >
                    <Image
                      src={img(p, 80, 40)}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* floating stat chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1, ease }}
            className="absolute -bottom-5 -left-4 rounded-2xl border border-white/15 bg-background/90 px-4 py-3 shadow-xl backdrop-blur"
          >
            <p className="font-heading text-2xl font-extrabold text-brand">42+</p>
            <p className="text-[11px] font-medium text-muted-foreground">
              Member countries
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
