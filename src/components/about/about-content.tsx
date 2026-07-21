"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  VolumeHighIcon,
  VolumeMuteIcon,
} from "@hugeicons/core-free-icons";
import { motion, useScroll, useTransform } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { img, objectives, PHOTOS, stats } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const CONFERENCE_VIDEO_ID = "nFj26B8jyJM";

/* ------------------------------------------------------------------ */
/* Intro — welcome title, conference video, mission copy               */
/* ------------------------------------------------------------------ */

/**
 * Autoplays on every browser without a click — Chrome, Safari and Firefox
 * only allow unprompted autoplay when the media starts muted.
 */
function ConferenceVideo() {
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-neutral-900 shadow-2xl shadow-neutral-200/70">
      <iframe
        key={muted ? "muted" : "unmuted"}
        src={`https://www.youtube-nocookie.com/embed/${CONFERENCE_VIDEO_ID}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${CONFERENCE_VIDEO_ID}&controls=1&playsinline=1`}
        title="Welcome to Automobile Logistics Network"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 size-full"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 grid size-10 cursor-pointer place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-colors duration-300 hover:bg-black/80"
      >
        <HugeiconsIcon icon={muted ? VolumeMuteIcon : VolumeHighIcon} size={18} />
      </button>
    </div>
  );
}

const intro = [
  {
    heading: "Qualified Specialists in every market",
    paragraphs: [
      "The Automobile Logistics Network (ALN) membership consists of handpicked freight forwarders and logistics providers in each major country that exports and imports automobiles. They cooperate with each other to develop business opportunities among themselves in the automobile logistics industry.",
      "ALN members are qualified and experienced in providing end-to-end logistics solutions for international and domestic automobile transportation — at a low cost with a high return, while being mutually beneficial.",
      "ALN's policy is to have one member from each country, equipped with knowledge of local and international policies, procedures and regulations for the export and import of automobiles.",
    ],
    note: "ALN follows a selective membership model, carefully appointing a limited number of qualified companies in each country. This approach promotes stronger cooperation, meaningful business opportunities, and high-quality representation across the global automobile logistics industry.",
  },
  {
    heading: "A trade few forwarders master",
    paragraphs: [
      "Members hold contacts with manufacturers, exporters, importers, carriers, government and non-government institutions — everything needed to provide complete logistics services for the industry. Automobile logistics is a specialised sector where few providers are involved.",
      "It is, however, a high-revenue and profit-generating business due to the nature of its logistics complexity. Our members are strengthened by sharing operational and marketing hints, market sizes and available opportunities in their respective countries.",
    ],
    note: null,
  },
] as const;

export function AboutIntro() {
  return (
    <section className="bg-white pb-20 pt-36 text-black sm:pb-24 sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">About</span>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto mt-8 max-w-4xl">
          <ConferenceVideo />
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <TextReveal
            as="h2"
            text="Welcome to Automobile Logistics Network"
            highlight={["Automobile", "Logistics", "Network"]}
            className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
        </div>

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-3xl text-center">
          <Eyebrow>Global network for trusted automobile partners</Eyebrow>
        </Reveal>

        <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-14">
          {intro.map((block) => (
            <div key={block.heading}>
              <TextReveal
                as="h3"
                text={block.heading}
                className="font-heading text-2xl font-bold tracking-tight text-neutral-900 text-balance sm:text-3xl"
              />
              <div className="mt-5 space-y-4">
                {block.paragraphs.map((p, j) => (
                  <Reveal key={j} delay={0.05 + j * 0.08}>
                    <p className="text-base leading-relaxed text-neutral-600">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>
              {block.note && (
                <Reveal delay={0.2}>
                  <p className="mt-5 rounded-2xl border border-brand/15 bg-brand/[0.04] p-5 text-sm leading-relaxed text-neutral-600">
                    {block.note}
                  </p>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page header + parallax banner                                       */
/* ------------------------------------------------------------------ */

export function AboutHeader() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section className="bg-white pt-4 text-black sm:pt-6">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal delay={0.05}>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="The network behind automobile logistics"
            highlight={["automobile", "logistics"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Handpicked freight forwarders and logistics providers in every
              major country that exports and imports automobiles — cooperating
              to develop business opportunities across the industry.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Parallax banner */}
      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div
            ref={bannerRef}
            className="relative aspect-[21/9] overflow-hidden rounded-[2rem] shadow-2xl shadow-neutral-200/70 sm:aspect-[21/8]"
          >
            <motion.div style={{ y: imageY }} className="absolute -inset-y-[14%] inset-x-0">
              <Image
                src={img(PHOTOS.heroPort, 1800, 70)}
                alt="Container port with cranes loading vehicles"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1216px"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 sm:bottom-8 sm:left-8">
              {["Est. 12 years", "42+ countries", "One partner per market"].map(
                (chip, i) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                    className="rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
                  >
                    {chip}
                  </motion.span>
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Story blocks                                                        */
/* ------------------------------------------------------------------ */

const story = [
  {
    eyebrow: "The invitation",
    heading: "A global network, open to the right partner",
    photo: PHOTOS.carCarrier,
    alt: "Car carrier truck loaded with vehicles",
    paragraphs: [
      "This is a global network supporting end-to-end logistics for the automobile industry — delivering brand new and used units, from 2-wheelers up to oversized automobiles, from manufacturer to end-user via road, rail, sea or air.",
      "An automobile is a global product that moves across every country. Manufacturers, traders, dealers and end-users look for service providers in their region — and that is exactly where the need for automobile logistics providers arises.",
      "You may be the right partner in your country to enjoy the benefits, develop your business and become a successful stakeholder in our group. We guarantee you'll be delighted to meet members from various countries at our next conference.",
    ],
  },
];

export function AboutStory() {
  return (
    <section className="bg-white py-24 text-black sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-5 sm:gap-32 sm:px-8">
        {story.map((block, i) => {
          const imageLeft = i % 2 === 1;
          return (
            <div
              key={block.heading}
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
            >
              <div className={imageLeft ? "lg:order-2" : ""}>
                <Reveal>
                  <Eyebrow>{block.eyebrow}</Eyebrow>
                </Reveal>
                <TextReveal
                  as="h2"
                  text={block.heading}
                  className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
                />
                <div className="mt-6 space-y-4">
                  {block.paragraphs.map((p, j) => (
                    <Reveal key={j} delay={0.1 + j * 0.08}>
                      <p className="text-base leading-relaxed text-neutral-600">
                        {p}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal
                direction={imageLeft ? "right" : "left"}
                className={imageLeft ? "lg:order-1" : ""}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl shadow-neutral-200/60">
                  <Image
                    src={img(block.photo, 1000, 70)}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 font-heading text-xs font-bold tabular-nums text-neutral-900 backdrop-blur">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(story.length).padStart(2, "0")}
                  </span> */}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pillars — the four objective cards                                  */
/* ------------------------------------------------------------------ */

export function AboutPillars() {
  return (
    <section className="bg-white py-24 text-black sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>What drives us</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Built on four clear pillars"
            highlight={["four"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {objectives.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-8 transition-all duration-500 hover:border-brand/25 hover:bg-white hover:shadow-xl hover:shadow-brand/[0.06]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 font-heading text-8xl font-extrabold text-neutral-900/[0.04] transition-colors duration-500 group-hover:text-brand/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-heading text-xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-brand">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats band                                                          */
/* ------------------------------------------------------------------ */

export function AboutStats() {
  return (
    <section className="bg-white py-10 text-black">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-10 rounded-[2rem] bg-neutral-100 px-8 py-12 sm:grid-cols-4 sm:gap-6 sm:px-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className="text-center"
              >
                <p className="font-heading text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <a
              href="/#membership"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 transition-colors hover:text-brand"
            >
              Ready to join the network? Explore membership
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
