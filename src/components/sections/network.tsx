"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, GlobalIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Marquee } from "@/components/ui/marquee";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { img, PHOTOS } from "@/lib/site";

const countries = [
  "Japan", "Germany", "United Kingdom", "UAE", "Sri Lanka", "Singapore",
  "Australia", "USA", "South Korea", "India", "South Africa", "Netherlands",
  "Kenya", "Thailand", "Malaysia", "New Zealand",
];

export function Network() {
  return (
    <section id="network" className="relative overflow-hidden bg-ink py-24 text-ink-foreground sm:py-28">
      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={img(PHOTOS.containers, 1800, 60)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-brand/40" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <Eyebrow tone="light">Global network</Eyebrow>
            </Reveal>
            <TextReveal
              as="h2"
              text="One trusted partner in every major market"
              highlight={["trusted", "partner"]}
              className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white text-balance sm:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                ALN&apos;s policy is to have one member from each country —
                equipped with knowledge of local and international policies,
                procedures and regulations for the export and import of
                automobiles. Meet members from across the world at our next
                conference.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button
                size="lg"
                className="mt-8 h-12 rounded-full bg-gold px-6 text-sm font-semibold text-gold-foreground hover:bg-gold/90"
                render={<a href="#membership" />}
              >
                Become a Member
                <HugeiconsIcon icon={ArrowRight01Icon} />
              </Button>
            </Reveal>
          </div>

          {/* stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: GlobalIcon, value: 42, suffix: "+", label: "Countries covered" },
              { value: 180, suffix: "+", label: "Member partners" },
              { value: 6, suffix: "", label: "Continents served" },
              { value: 24, suffix: "/7", label: "Coordinated support" },
            ].map((card, i) => (
              <Reveal key={card.label} delay={i * 0.1}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  {card.icon && (
                    <span className="mb-4 grid size-11 place-items-center rounded-2xl bg-gold/20 text-gold">
                      <HugeiconsIcon icon={card.icon} size={22} />
                    </span>
                  )}
                  <div className="font-heading text-3xl font-extrabold text-white">
                    <Counter value={card.value} suffix={card.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-white/60">{card.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* countries marquee */}
        <div className="mt-16">
          <Marquee slow>
            {countries.map((c) => (
              <span
                key={c}
                className="flex items-center gap-3 text-lg font-semibold text-white/40"
              >
                {c}
                <span className="size-1.5 rounded-full bg-gold/70" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
