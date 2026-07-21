"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/ui/marquee";

/**
 * Real member logos supplied by ALN, served from /public/company.
 * Filenames double as the display name (minus extension).
 */
const partnerFiles = [
  "Abu Dhabi.png",
  "Afghanistan.png",
  "Bangladesh silk.png",
  "Bangladesh.jpg",
  "Belgium.png",
  "Benin.png",
  "Brazil.png",
  "CAMEROON.jpg",
  "CHINA.jpg",
  "CPWORLD PNG.png",
  "Cambodiya.jpg",
  "Canada.jpg",
  "Charitha Mario.png",
  "Clarion.jpg",
  "Contra Conslidators SA.jpeg",
  "Costa Rica.png",
  "D R Congo.jpg",
  "Egypt.png",
  "FIJI.png",
  "GOOD LOGI USA.png",
  "Germany.jpeg",
  "Ghana Jonas.jpg",
  "Grand Cayman.jpg",
  "Greece.png",
  "Guyana.png",
  "INDONESIA.jpg",
  "India.jpg",
  "Japan Shin Ryu.jpg",
  "Japan.png",
  "Jordan.png",
  "Kenya 1.jpg",
  "Korea.jpeg",
  "LAOS.png",
  "LTN Logistics International Co. Ltd.png",
  "Liberia.png",
  "MADAGASCAR.png",
  "Malaysia.png",
  "Maldives 1.png",
  "Mali.jpg",
  "Malta.png",
  "Mauritius.png",
  "Mexico.jpg",
  "Moldova.jpg",
  "Mongolia.jpeg",
  "Morocco.png",
  "Mozambique.png",
  "Myanmar.jpg",
  "NETWORLD LOGO Zambia.png",
  "Nigeria.jpg",
  "Northeast Freight & Handling Services Ltd. (Dominica).jpg",
  "Peru.png",
  "Promise Logistics Rwanda.jpg",
  "RENOWN THAILAND.jpg",
  "RVC UAE.png",
  "Russia.jpg",
  "SEAFARER PAK.jpg",
  "Senegal.png",
  "Slovenia.png",
  "Sound and Swift Logistics TAIWAN.jpeg",
  "Spain (1).png",
  "TIMEshipping Italy.jpg",
  "TOGO.png",
  "Tonga.png",
  "Trinidad & Tobago.jpg",
  "UK.png",
  "Uruguay.jpg",
  "Vietnam 1.png",
  "denmark.jpg",
  "hey transport logo-1_page-0001.jpg",
  "ukraine.png",
  "zimbabwe.jpg",
] as const;

const partners = partnerFiles.map((file) => ({
  name: file.replace(/\.[^.]+$/, ""),
  src: `/company/${encodeURIComponent(file)}`,
}));

function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      title={name}
      className="group/card flex h-28 w-44 shrink-0 cursor-default items-center justify-center rounded-2xl bg-white px-6 shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl hover:shadow-black/[0.06]"
    >
      <div className="relative h-16 w-full opacity-55 grayscale transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:grayscale-0">
        <Image
          src={src}
          alt={name}
          fill
          sizes="176px"
          className="object-contain"
        />
      </div>
    </motion.div>
  );
}

const half = Math.ceil(partners.length / 2);
const topRow = partners.slice(0, half);
const bottomRow = partners.slice(half);

export function LogoCloud() {
  return (
    <section className="overflow-hidden bg-neutral-100 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            A network of thriving businesses
          </h2>
          <p className="mt-4 text-lg text-neutral-500">
            Handpicked member logistics providers across six continents.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-16 flex flex-col gap-4">
        {/* Top row drifts left → right, bottom row right → left */}
        {/* Each row repeats its logos so one loop segment stays wider than the viewport */}
        <Marquee slow reverse className="[&>div]:gap-4 [&>div]:pr-4">
          {[0, 1].map((rep) =>
            topRow.map((p) => <LogoCard key={`${p.name}-${rep}`} {...p} />),
          )}
        </Marquee>
        <Marquee slow className="[&>div]:gap-4 [&>div]:pr-4">
          {[0, 1].map((rep) =>
            bottomRow.map((p) => <LogoCard key={`${p.name}-${rep}`} {...p} />),
          )}
        </Marquee>
      </Reveal>
    </section>
  );
}
