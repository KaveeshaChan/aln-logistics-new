"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Airplane01Icon,
  AnchorIcon,
  DeliveryTruck01Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Marquee } from "@/components/ui/marquee";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger } from "@/components/motion/reveal";

const testimonials = [
  {
    quote:
      "Having one vetted partner in every market changed how we quote. RoRo bookings that took a week of emails now close in a day.",
    name: "Kenji Watanabe",
    role: "Director, Yokohama Auto Export",
    company: "Japan",
  },
  {
    quote:
      "The shared market intelligence is the real value. We entered two new trade lanes last year purely on member referrals.",
    name: "Anke Visser",
    role: "Managing Partner, Rotterdam",
    company: "Netherlands",
  },
  {
    quote:
      "From customs paperwork to yard storage, the network covered our client's full door-to-door move across three continents.",
    name: "Sofia Almeida",
    role: "Operations Head, Lisbon",
    company: "Portugal",
  },
  {
    quote:
      "We moved 400 units in our first quarter as a member — volume we simply could not have reached working alone.",
    name: "Ravi Fernando",
    role: "Founder, Colombo Freight Line",
    company: "Sri Lanka",
  },
  {
    quote:
      "The annual conference alone pays for the membership. Real handshakes, real contracts, real specialists in this trade.",
    name: "Sarah Mitchell",
    role: "Commercial Director, Sydney",
    company: "Australia",
  },
];

const stats = [
  {
    value: 90,
    suffix: "+",
    label: "member countries across six continents",
    icon: AnchorIcon,
    caption: "One trusted, vetted partner in every major market",
  },
  {
    value: 15,
    suffix: "K",
    label: "vehicles moved through the network yearly",
    icon: DeliveryTruck01Icon,
    caption: "From 2-wheelers to oversized units, door to door",
  },
  {
    value: 9,
    suffix: "",
    label: "years connecting automobile logistics specialists",
    icon: Airplane01Icon,
    caption: "Secured business and maximized profits since day one",
  },
];

function TestimonialCard({
  quote,
  name,
  role,
  company,
}: (typeof testimonials)[number]) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <motion.figure
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex h-full w-[22rem] shrink-0 flex-col justify-between whitespace-normal rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/70 sm:w-[26rem]"
    >
      <blockquote className="text-[15px] leading-relaxed text-neutral-800">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 font-heading text-sm font-bold text-brand">
            {initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">{name}</p>
            <p className="text-xs text-neutral-500">{role}</p>
          </div>
        </div>
        <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {company}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Network() {
  return (
    <section id="network" className="relative overflow-hidden bg-white py-24 text-black sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl">
            What members say about{" "}
            <span className="text-brand">ALN</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
            Freight forwarders and logistics providers across six continents
            use the network to win protected business. Here is how membership
            fits real operations.
          </p>
        </Reveal>
      </div>

      {/* Drifting testimonial rows */}
      <Reveal delay={0.15} className="mt-14 flex flex-col gap-5">
        {/* Each row repeats its cards so one loop segment stays wider than the viewport */}
        <Marquee slow className="[&>div]:gap-5 [&>div]:pr-5 [&>div]:items-stretch">
          {[0, 1].map((rep) =>
            testimonials
              .slice(0, 3)
              .map((t) => <TestimonialCard key={`${t.name}-${rep}`} {...t} />),
          )}
        </Marquee>
        <Marquee slow reverse className="[&>div]:gap-5 [&>div]:pr-5 [&>div]:items-stretch">
          {[0, 1].map((rep) =>
            testimonials
              .slice(3)
              .map((t) => <TestimonialCard key={`${t.name}-${rep}`} {...t} />),
          )}
        </Marquee>
      </Reveal>

      {/* Stat cards */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <Stagger.Item key={stat.label} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group flex h-full flex-col rounded-2xl border border-neutral-200/80 bg-neutral-50 p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/70"
              >
                <p className="font-heading text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm text-neutral-500">{stat.label}</p>

                <div className="my-10 flex flex-1 items-center justify-center">
                  <span className="grid size-20 place-items-center rounded-3xl bg-white text-neutral-300 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:text-brand">
                    <HugeiconsIcon icon={stat.icon} size={36} />
                  </span>
                </div>

                <p className="text-base font-semibold leading-snug text-neutral-900">
                  {stat.caption}
                </p>
              </motion.div>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
