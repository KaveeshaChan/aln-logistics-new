"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function ServicesHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">Service &amp; Quote</span>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <Reveal delay={0.05}>
              <Eyebrow>Services we provide</Eyebrow>
            </Reveal>
            <TextReveal
              as="h1"
              text="End-to-end logistics for every automobile"
              highlight={["every", "automobile"]}
              className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-6xl"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-neutral-600">
              The Automobile Logistics Network is a premier global network in
              the worldwide movement of automobiles — prestigious freight
              forwarders dedicated to comprehensive end-to-end logistics, with
              relentless support and prompt service around the clock, to any
              part of the world.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Videos — lite embeds that swap to an iframe on play                 */
/* ------------------------------------------------------------------ */

const videos = [
  {
    id: "UGfTU4sVhKI",
    start: 11,
    title: "ALN Sri Lanka Member | Clarion Logistics (Pvt) Ltd",
  },
  {
    id: "hxrsjXypCmc",
    title: "ALN | United Kingdom Member Auto Box Logistics (Pvt) Ltd",
  },
  {
    id: "pSwcn8Ht7ww",
    title: "R Rak Storage Procedure — ALN",
  },
];

function VideoCard({
  id,
  start,
  title,
  large = false,
}: {
  id: string;
  start?: number;
  title: string;
  large?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.figure
      whileHover={playing ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xl shadow-neutral-200/70">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1${start ? `&start=${start}` : ""}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 size-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={cn(
                "absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand shadow-2xl backdrop-blur transition-shadow duration-300 group-hover:shadow-brand/30",
                large ? "size-20" : "size-14",
              )}
            >
              <svg
                width={large ? 26 : 18}
                height={large ? 26 : 18}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </motion.span>
          </button>
        )}
      </div>
      <figcaption
        className={cn(
          "mt-4 font-heading font-bold text-neutral-900 transition-colors duration-300 group-hover:text-brand",
          large ? "text-lg sm:text-xl" : "text-sm sm:text-base",
        )}
      >
        {title}
      </figcaption>
    </motion.figure>
  );
}

export function ServicesVideos() {
  const [main, ...rest] = videos;

  return (
    <section className="bg-white py-16 text-black sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <VideoCard {...main} large />
        </Reveal>
        <Stagger className="mt-10 grid gap-8 sm:grid-cols-2">
          {rest.map((video) => (
            <Stagger.Item key={video.id} className="h-full">
              <VideoCard {...video} />
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Value-added services grid                                           */
/* ------------------------------------------------------------------ */

const valueAddedServices = [
  "Containerised sea freight solutions",
  "R racks & super racks freight solutions",
  "Rail and road freight services",
  "Roll in roll out freight services",
  "Storage and distribution solutions",
  "Import and export customs clearing",
  "Pre- and post-shipping documents preparation",
  "Freight and logistics for classic cars",
  "Freight and logistics for car rallies and races",
  "Air freight logistics",
  "Port handling",
  "Freeport facilitation",
  "Vehicle transshipment",
  "Marine insurance",
  "Pre-inspection services",
  "Consultations",
];

export function ServicesGrid() {
  return (
    <section className="bg-white py-16 text-black sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Value-added services</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Everything your vehicle move needs"
            highlight={["Everything"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-neutral-500">
              ALN offers its services for your vehicle exports and imports
              around the globe through our network of agents.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {valueAddedServices.map((service, i) => (
            <Stagger.Item key={service} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="group flex h-full items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4.5 transition-all duration-300 hover:border-brand/25 hover:bg-white hover:shadow-lg hover:shadow-brand/[0.05]"
              >
                <span className="font-heading text-xs font-bold tabular-nums text-neutral-300 transition-colors duration-300 group-hover:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium leading-snug text-neutral-800">
                  {service}
                </p>
              </motion.div>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ATA Carnet band                                                     */
/* ------------------------------------------------------------------ */

const carnet = [
  "Enter port service",
  "Free re-import certificate",
  "Freeport facilities",
];

export function ServicesCarnet() {
  return (
    <section className="bg-white py-14 text-black">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[2rem] bg-neutral-100 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Eyebrow>ATA Carnet</Eyebrow>
              <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                Motor shows, tracks, rallies and races — handled
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-600">
                One of our key strengths is handling automobiles and machinery
                for projects, motor shows, tracks and races under ATA Carnet or
                Free Port facilities — including specialised logistics for
                classic and vintage vehicles, for personal usage or worldwide
                races and rallies.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {carnet.map((item, i) => (
                <Reveal key={item} delay={0.1 + i * 0.08}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="group flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                    </span>
                    <p className="text-sm font-semibold text-neutral-900">
                      {item}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Capabilities copy + agents strip                                    */
/* ------------------------------------------------------------------ */

export function ServicesCapabilities() {
  return (
    <section className="bg-white py-16 text-black sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>The full spectrum</Eyebrow>
            </Reveal>
            <TextReveal
              as="h2"
              text="From two-wheelers to heavy machinery"
              highlight={["heavy", "machinery"]}
              className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
            />
            <div className="mt-6 space-y-4">
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-neutral-600">
                  We are the sole logistics network providing a full range of
                  freight and logistics services for brand new and used
                  automobiles — from two-wheelers to the largest automobiles,
                  heavy machinery, boats, yachts and air crafts, oversized
                  vehicles, cranes, caterpillars, excavators, concrete mixers,
                  construction machinery, fire fighting trucks and military
                  equipment.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-base leading-relaxed text-neutral-600">
                  Our members have designed and tailor-made their services to
                  fit any customer&apos;s unique needs — competitive rates,
                  cost-effective and time-saving solutions based on
                  optimisation. Find us and feel the difference.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5">
            {[
              {
                value: 45,
                suffix: "+",
                label:
                  "major countries represented by qualified, experienced logistics agents",
              },
              {
                value: 4,
                suffix: "",
                label:
                  "modes of transport — road, rail, air and sea, in containers and RO-RO vessels",
              },
              {
                value: 100,
                suffix: "%",
                label:
                  "coverage from point of origin to end user — the full spectrum, ensuring the last mile",
              },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="flex items-center gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-300 hover:border-brand/25 hover:bg-white hover:shadow-lg hover:shadow-brand/[0.05]"
                >
                  <p className="w-24 shrink-0 font-heading text-4xl font-extrabold tracking-tight text-brand">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Agents strip */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-neutral-200 p-8 sm:flex-row sm:p-10">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                <HugeiconsIcon icon={GlobalIcon} size={24} />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-neutral-900">
                  Agents in countries
                </h3>
                <p className="mt-1 max-w-xl text-sm text-neutral-600">
                  Reach out to our agent in your country for freight rates,
                  consultation services and import/export procedures under your
                  country&apos;s legislation.
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="shrink-0"
            >
              <Button
                nativeButton={false}
                size="lg"
                className="group h-12 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand/90"
                render={<a href="/quote" />}
              >
                Find your agent
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <HugeiconsIcon icon={ArrowRight01Icon} />
                </span>
              </Button>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
