"use client";

import Image from "next/image";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { Reveal, Stagger } from "@/components/motion/reveal";
import { img, services } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function ServiceRow({
  index,
  service,
  open,
  onToggle,
}: {
  index: number;
  service: (typeof services)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const panelId = `service-panel-${index}`;

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full cursor-pointer grid-cols-[3rem_1fr_2rem] items-center gap-4 py-7 text-left outline-none transition-colors duration-300 sm:grid-cols-[minmax(4rem,1fr)_2fr_minmax(2rem,1fr)]"
      >
        <span
          className={cn(
            "font-heading text-lg font-semibold tabular-nums transition-colors duration-300",
            open ? "text-brand" : "text-neutral-400 group-hover:text-neutral-700",
          )}
        >
          {number}
        </span>
        <span
          className={cn(
            "font-heading text-xl font-bold tracking-tight transition-all duration-300 sm:text-2xl",
            open
              ? "text-neutral-900"
              : "text-neutral-600 group-hover:translate-x-1.5 group-hover:text-neutral-900",
          )}
        >
          {service.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease }}
          className={cn(
            "grid size-9 place-items-center justify-self-end rounded-full border transition-colors duration-300",
            open
              ? "border-brand/30 bg-brand/5 text-brand"
              : "border-neutral-200 text-neutral-400 group-hover:border-neutral-300 group-hover:text-neutral-700",
          )}
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 pt-1 sm:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr_260px]">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="group/img relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img(service.photo, 700, 65)}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 300px"
                  className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                    <HugeiconsIcon icon={service.icon} size={22} />
                  </span>
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
                  {service.description}
                </p>
              </motion.div>

              <div className="sm:col-span-2 lg:col-span-1">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="text-sm font-medium text-neutral-400"
                >
                  Categories
                </motion.p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 10, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.28 + i * 0.06,
                        ease,
                      }}
                      className="cursor-default rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-300 hover:bg-brand"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="relative bg-white py-24 text-black sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-heading text-6xl font-extrabold tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl">
            Services
            <span className="text-brand">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-neutral-500">
            From brand-new and used vehicles to automotive spare parts, tyres, oversized cargo, and related automotive equipment — total logistics solutions across every mode of transport, handled by specialists.
          </p>
        </Reveal>

        <Stagger className="mt-20 border-t border-neutral-200">
          {services.map((service, i) => (
            <Stagger.Item key={service.title}>
              <ServiceRow
                index={i}
                service={service}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
