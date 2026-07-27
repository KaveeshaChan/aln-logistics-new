"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  CrownIcon,
  SparklesIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import {
  membershipBenefits,
  membershipTiers,
  type MembershipCell,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Opacity-only (no x/y) so Framer Motion never writes a `transform` on these
// rows — a transformed ancestor silently breaks `position: sticky` on the
// first column / header cells inside the table.
const rowVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease } },
};

function Cell({ value, featured }: { value: MembershipCell; featured?: boolean }) {
  if (value === true) {
    return (
      <span
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full transition-colors duration-300",
          featured ? "bg-brand text-white shadow-sm shadow-brand/30" : "bg-brand/10 text-brand",
        )}
      >
        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} strokeWidth={2.5} />
      </span>
    );
  }

  if (value === false) {
    return <span className="text-sm font-medium text-neutral-300">—</span>;
  }

  if ("star" in value) {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-gradient-to-r from-brand to-brand-muted px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white shadow-sm shadow-brand/25">
        <HugeiconsIcon icon={StarIcon} size={10} />
        {value.star}
      </span>
    );
  }

  return (
    <span className="whitespace-nowrap text-xs font-semibold text-neutral-600">
      {value.text}
    </span>
  );
}

export function MembershipTable() {
  return (
    <section className="relative overflow-hidden bg-white py-24 text-black sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Membership tiers</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Compare Trial, Standard & Premium"
            highlight={["Premium"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Every tier unlocks the ALN network — Premium members simply move
              to the front of the line for visibility, referrals and support.
            </p>
          </Reveal>
        </div>

        {/* Mobile swipe hint */}
        <Reveal delay={0.15} className="mt-8 flex justify-center sm:hidden">
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3.5 py-1.5 text-xs font-medium text-neutral-500"
          >
            Swipe to compare plans
            <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </motion.span>
        </Reveal>

        {/* Opacity-only fade (no x/y transform) — a transformed ancestor
            breaks position:sticky on the table's header row / first column. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-8 sm:mt-14"
        >
          <div className="relative overflow-x-auto rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/50">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 top-[88px] z-30 min-w-[280px] border-b border-neutral-100 bg-white px-6 py-6 text-left align-bottom font-heading text-base font-bold text-neutral-900"
                  >
                    Membership Benefits
                  </th>
                  {membershipTiers.map((tier) => (
                    <th
                      key={tier.key}
                      scope="col"
                      className={cn(
                        "sticky top-[88px] z-20 min-w-[168px] border-b border-l border-neutral-100 px-5 py-6 text-center align-bottom",
                        tier.featured
                          ? "bg-gradient-to-b from-brand/[0.09] to-transparent"
                          : "bg-white",
                      )}
                    >
                      <div className="relative">
                        {tier.featured && (
                          <div className="mb-3 flex justify-center">
                            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white shadow-md shadow-brand/30">
                              <HugeiconsIcon icon={SparklesIcon} size={11} />
                              Best value
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-center gap-1.5">
                          {tier.featured && (
                            <HugeiconsIcon
                              icon={CrownIcon}
                              size={16}
                              className="text-brand"
                            />
                          )}
                          <span className="font-heading text-base font-bold text-neutral-900">
                            {tier.name}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span
                            className={cn(
                              "font-heading text-2xl font-extrabold tracking-tight sm:text-3xl",
                              tier.featured ? "text-brand" : "text-neutral-900",
                            )}
                          >
                            {tier.price}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-snug text-neutral-500">
                          {tier.period}
                        </p>
                        <p className="mt-2 hidden text-xs leading-snug text-neutral-400 lg:block">
                          {tier.blurb}
                        </p>
                        <motion.div
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 320, damping: 20 }}
                          className="mt-4"
                        >
                          <Button
                            nativeButton={false}
                            size="lg"
                            className={cn(
                              "h-8 w-full rounded-full px-3 text-[0.7rem] font-semibold",
                              tier.featured
                                ? "bg-brand text-white shadow-md shadow-brand/25 hover:bg-brand/90"
                                : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                            )}
                            render={<a href="/contact" />}
                          >
                            {tier.cta}
                          </Button>
                        </motion.div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {membershipBenefits.map((group) => (
                <motion.tbody
                  key={group.category}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{ show: { transition: { staggerChildren: 0.045 } } }}
                >
                  <motion.tr variants={rowVariants}>
                    <td
                      colSpan={membershipTiers.length + 1}
                      className="sticky left-0 border-y border-neutral-100 bg-neutral-50/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500"
                    >
                      {group.category}
                    </td>
                  </motion.tr>

                  {group.rows.map((row) => (
                    <motion.tr
                      key={row.label}
                      variants={rowVariants}
                      className="group transition-colors hover:bg-neutral-50/70"
                    >
                      <td className="sticky left-0 z-10 max-w-xs border-b border-neutral-100 bg-white px-6 py-4 text-sm leading-snug text-neutral-700 transition-colors duration-300 group-hover:bg-neutral-50/90">
                        {row.label}
                      </td>
                      <td className="border-b border-l border-neutral-100 px-5 py-4 text-center">
                        <div className="flex justify-center">
                          <Cell value={row.trial} />
                        </div>
                      </td>
                      <td className="border-b border-l border-neutral-100 px-5 py-4 text-center">
                        <div className="flex justify-center">
                          <Cell value={row.standard} />
                        </div>
                      </td>
                      <td className="border-b border-l border-neutral-100 bg-brand/[0.035] px-5 py-4 text-center transition-colors duration-300 group-hover:bg-brand/[0.06]">
                        <div className="flex justify-center">
                          <Cell value={row.premium} featured />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              ))}
            </table>
          </div>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-5 text-center text-xs text-neutral-400">
            *Subject to ALN Annual Conference terms and availability. ALN
            Payment Protection Plan (PPP) covers eligible transactions between
            members.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
