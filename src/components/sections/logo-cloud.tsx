"use client";

import { motion } from "motion/react";

import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/ui/marquee";

function MicrosoftIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <span className="font-heading text-2xl font-semibold tracking-tight">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

function PayPalIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.5 3h6.2c3 0 4.8 1.6 4.4 4.4-.4 3.1-2.5 4.6-5.5 4.6H10l-.9 5.5H5.5L7.5 3z"
        fill="#003087"
      />
      <path
        d="M9.7 6.5h5.6c2.4 0 3.9 1.3 3.5 3.7-.4 2.6-2.1 3.9-4.6 3.9h-2.1l-.8 4.9H8.2l1.5-12.5z"
        fill="#009cde"
        opacity="0.9"
      />
    </svg>
  );
}

function HubSpotLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-heading text-2xl font-bold text-[#33475B]">
        HubSp
      </span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="-mx-1 mt-0.5">
        <circle cx="12" cy="14" r="6" fill="#FF7A59" />
        <line
          x1="12"
          y1="8"
          x2="12"
          y2="3.5"
          stroke="#FF7A59"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="3" r="1.6" fill="#FF7A59" />
      </svg>
      <span className="-ml-1 font-heading text-2xl font-bold text-[#33475B]">
        t
      </span>
    </div>
  );
}

function EvernoteIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2 3 7v11a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H8z"
        fill="#2DBE60"
      />
      <path d="M8 2v4a1 1 0 0 1-1 1H3l5-5z" fill="#1A9E4B" />
      <circle cx="15" cy="16" r="2.5" fill="white" />
    </svg>
  );
}

function WalmartLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-heading text-2xl font-bold text-[#0071CE]">
        Walmart
      </span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x="10.6"
            y="1"
            width="2.8"
            height="8"
            rx="1.4"
            fill="#FFC220"
            transform={`rotate(${i * 60} 12 12)`}
          />
        ))}
      </svg>
    </div>
  );
}

function AmazonLogo() {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-2xl font-bold lowercase leading-none text-[#221F1F]">
        amazon
      </span>
      <svg width="64" height="12" viewBox="0 0 64 12" fill="none" className="-mt-0.5">
        <path
          d="M3 2 Q32 13 61 3"
          stroke="#FF9900"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M55 1.5 L61.5 3 L58.5 8"
          stroke="#FF9900"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SonosIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#111111" />
      <circle cx="12" cy="12" r="5" fill="white" />
      <circle cx="12" cy="12" r="2.4" fill="#111111" />
    </svg>
  );
}

function DeloitteLogo() {
  return (
    <span className="font-heading text-3xl font-extrabold text-[#0F0B0B]">
      Deloitte
      <span className="text-[#86BC25]">.</span>
    </span>
  );
}

function HuaweiIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="12"
          cy="5.5"
          rx="2"
          ry="4.2"
          fill="#CC0000"
          opacity="0.9"
          transform={`rotate(${i * 45} 12 12)`}
        />
      ))}
    </svg>
  );
}

function FedExLogo() {
  return (
    <span className="font-heading text-3xl font-extrabold tracking-tight">
      <span className="text-[#4D148C]">Fed</span>
      <span className="text-[#FF6600]">Ex</span>
      <span className="align-super text-xs text-[#4D148C]">®</span>
    </span>
  );
}

function AirbnbIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FF5A5F" />
      <path
        d="M12 5.5c-1.8 3-4.2 6.3-4.2 8.6a4.2 4.2 0 0 0 8.4 0c0-2.3-2.4-5.6-4.2-8.6z"
        fill="white"
      />
      <circle cx="12" cy="13.5" r="1.7" fill="#FF5A5F" />
    </svg>
  );
}

/**
 * `wide: false` renders a narrow icon-only card, matching the reference
 * layout's alternating icon / wordmark rhythm.
 */
const partners = [
  { name: "Microsoft", wide: false, Logo: MicrosoftIcon },
  { name: "Google", wide: true, Logo: GoogleLogo },
  { name: "PayPal", wide: false, Logo: PayPalIcon },
  { name: "HubSpot", wide: true, Logo: HubSpotLogo },
  { name: "Evernote", wide: false, Logo: EvernoteIcon },
  { name: "Walmart", wide: true, Logo: WalmartLogo },
  { name: "Amazon", wide: true, Logo: AmazonLogo },
  { name: "Sonos", wide: false, Logo: SonosIcon },
  { name: "Deloitte", wide: true, Logo: DeloitteLogo },
  { name: "Huawei", wide: false, Logo: HuaweiIcon },
  { name: "FedEx", wide: true, Logo: FedExLogo },
  { name: "Airbnb", wide: false, Logo: AirbnbIcon },
] as const;

function LogoCard({
  name,
  wide,
  Logo,
}: {
  name: string;
  wide: boolean;
  Logo: () => React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      title={name}
      className={`group/card flex h-28 shrink-0 cursor-default items-center justify-center rounded-2xl bg-white px-6 shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl hover:shadow-black/[0.06] ${
        wide ? "w-64" : "w-36"
      }`}
    >
      <div className="opacity-55 grayscale transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:grayscale-0">
        <Logo />
      </div>
    </motion.div>
  );
}

const topRow = partners.slice(0, 6);
const bottomRow = partners.slice(6);

export function LogoCloud() {
  return (
    <section className="overflow-hidden bg-neutral-100 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            A network of thriving businesses
          </h2>
          <p className="mt-4 text-lg text-neutral-500">
            Trusted by startups, enterprises, and industry giants alike.
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
