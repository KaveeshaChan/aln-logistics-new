"use client";

import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";
import { clients } from "@/lib/site";

export function Clients() {
  return (
    <section className="border-y border-border bg-background py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by forwarders &amp; carriers worldwide
          </p>
        </Reveal>
        <Marquee>
          {clients.map((name) => (
            <span
              key={name}
              className="flex items-center gap-2.5 whitespace-nowrap font-heading text-2xl font-bold text-muted-foreground/50 transition-colors hover:text-brand"
            >
              <span className="grid size-7 place-items-center rounded-md bg-brand/10 text-sm text-brand">
                {name.charAt(0)}
              </span>
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
