"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { img, services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>What we move</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Master your automobile supply chain with expert logistics"
            highlight={["expert", "logistics"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-muted-foreground">
              From brand-new units to used vehicles and oversized cargo — total
              solutions across every mode of transport, handled by specialists.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Stagger.Item key={service.title}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img(service.photo, 700, 65)}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-2xl bg-background/95 text-brand shadow-lg backdrop-blur">
                    <HugeiconsIcon icon={service.icon} size={22} />
                  </span>
                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-gold text-gold-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
