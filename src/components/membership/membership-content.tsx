"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  GlobalIcon,
  Mail01Icon,
  PlusSignIcon,
  Shield01Icon,
  Time04Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function MembershipHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">Membership</span>
        </Reveal>

        <div className="mt-6 max-w-3xl">
          <Reveal delay={0.05}>
            <Eyebrow>Membership</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="Everything you need to become an ALN member"
            highlight={["ALN", "member"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              ALN brings together carefully selected companies specializing in automobile logistics and automotive cargo from around the world. Members collaborate to develop long-term business relationships, share opportunities, and strengthen their presence within the global automotive logistics industry.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Criteria — qualifying questions                                     */
/* ------------------------------------------------------------------ */

const criteria = [
  "Have experience in automobile logistics and/or automotive cargo, including vehicle transportation, RO-RO, containerized vehicle shipments, automotive spare parts, tyres, or related services",
  "Be capable of providing professional logistics solutions within your local market.",
  "Maintain a strong reputation for reliability, responsiveness, and customer service.",
  "Have the ability to build business relationships with vehicle manufacturers, exporters, importers, dealers, freight forwarders, or other companies within the automotive industry.",
  "Be committed to cooperating with fellow ALN members and responding promptly to business opportunities",
  "Share ALN's vision of developing long-term partnerships through professionalism, trust, and mutual business growth.",
];

export function MembershipCriteria() {
  return (
    <section className="bg-white py-20 text-black sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Criteria for membership</Eyebrow>
            </Reveal>
            <TextReveal
              as="h2"
              text="Are you the right partner for your country?"
              highlight={["right", "partner"]}
              className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-neutral-600">
                ALN is committed to building a trusted global community of qualified automobile logistics professionals. We carefully select companies that demonstrate experience, reliability, and a commitment to developing long-term partnerships within the network.
              </p>
            </Reveal>
          </div>

          <Stagger className="flex flex-col gap-3">
            {criteria.map((question, i) => (
              <Stagger.Item key={i}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group flex items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition-all duration-300 hover:border-brand/25 hover:bg-white hover:shadow-lg hover:shadow-brand/[0.05]"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                  </span>
                  <p className="text-[15px] leading-relaxed text-neutral-700">
                    {question}
                  </p>
                </motion.div>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Fee — pricing card                                                  */
/* ------------------------------------------------------------------ */

const feeIncludes = [
  "Complimentary 6-month Trial Membership.",
  "Opportunity to connect with members and experience the network firsthand.",
  "Business introductions and networking opportunities during the trial period.",
  "Companies may choose to continue with Standard Membership (USD 500 per year) after the trial period.",
  "Membership fee supports the administration, development, and ongoing activities of the network.",
  "Membership is renewed annually.",
];

export function MembershipFee() {
  return (
    <section className="bg-white py-14 text-black">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="grid overflow-hidden rounded-[2rem] border border-neutral-200 shadow-xl shadow-neutral-200/60 lg:grid-cols-[1.2fr_1fr]"
        >
          {/* Left — pitch */}
          <div className="p-8 sm:p-12">
            <Eyebrow>Membership fee</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Simple membership structure
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
              ALN offers selected companies the opportunity to experience the network before making any long-term commitment.
            </p>
            <ul className="mt-8 space-y-3.5">
              {feeIncludes.map((item, i) => (
                <Reveal key={i} as="li" delay={0.1 + i * 0.06}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} />
                    </span>
                    <span className="text-sm leading-relaxed text-neutral-700">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Right — price */}
          <div className="relative flex flex-col justify-center gap-6 bg-gradient-to-br from-brand via-brand to-brand-muted p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Standard Membership
              </p>
              <p className="mt-3 font-heading text-6xl font-extrabold tracking-tight">
                $500
                <span className="text-xl font-semibold text-white/70">
                  {" "}
                  / year
                </span>
              </p>
              <p className="mt-3 text-sm text-white/80">
                Renewable annually
              </p>
            </div>
            <div className="relative flex flex-col gap-3">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <Button
                  nativeButton={false}
                  size="lg"
                  className="group h-12 w-full rounded-full bg-white px-8 text-sm font-semibold text-brand hover:bg-white shadow-lg shadow-black/10"
                  render={<a href="/contact" />}
                >
                  Apply to represent your country
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <HugeiconsIcon icon={ArrowRight01Icon} />
                  </span>
                </Button>
              </motion.div>
              <a
                href="mailto:admin1@autologisticsnetwork.com"
                className="text-center text-xs text-white/75 transition-colors hover:text-white"
              >
                Questions? admin1@autologisticsnetwork.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    icon: GlobalIcon,
    title: "An integrated global network",
    body: "Be part of an international automobile logistics network that provides business opportunities through members' combined services.",
  },
  {
    icon: Shield01Icon,
    title: "Member directory access",
    body: "Easy access to the contact details of every other member by logging into ALN's website — one login, the whole network.",
  },
  {
    icon: Mail01Icon,
    title: "Intranet & WhatsApp community",
    body: "Share views, ask questions and exchange market information, sales inquiries and proposals — fostering friendship alongside business.",
  },
  {
    icon: Time04Icon,
    title: "Shared business leads",
    body: "A vast range of opportunities inside the network itself, mobilising the services other members provide across the world.",
  },
];

export function MembershipBenefits() {
  return (
    <section className="bg-white py-20 text-black sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Benefits &amp; privileges</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="What membership unlocks"
            highlight={["unlocks"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Stagger.Item key={benefit.title} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full rounded-3xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-500 hover:border-brand/25 hover:bg-white hover:shadow-xl hover:shadow-brand/[0.06]"
              >
                <motion.span
                  whileHover={{ rotate: -6, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="grid size-12 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25"
                >
                  <HugeiconsIcon icon={benefit.icon} size={24} />
                </motion.span>
                <h3 className="mt-5 font-heading text-lg font-bold text-neutral-900 transition-colors duration-300 group-hover:text-brand">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {benefit.body}
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
/* Rules — numbered accordion                                          */
/* ------------------------------------------------------------------ */

const rules: { title: string; points: string[] }[] = [
  {
    title: "Enrolment as a member",
    points: [
      "ALN welcomes all specialised freight and logistics companies from all parts of the world.",
      "Membership of another similar network does not disqualify you from joining ALN.",
      "Only one member per country is enrolled — exceptions apply only where business volumes exceed a single member's coverage.",
      "Members are selected mostly through recommendations from existing members; appointment remains at ALN's sole discretion.",
      "Each applicant should read and understand the application form's terms before entering the contract, and will receive a copy of the Rules and the Code of Business Ethics.",
      "Members are encouraged to list their certifications and licenses to promote their accreditation within the network.",
      "Payments must be completed before admission as a permanent member; on receipt of the application and payment, members are bound by the Rules and Code.",
    ],
  },
  {
    title: "Obligations of members",
    points: [
      "All members shall obey and abide by the Code and these Rules.",
      "Membership fees should be paid promptly each year at the point of annual renewal.",
      "Members are encouraged to attend the conference periodically.",
      "Treat all other members with dignity and respect, and assist them with queries even where no business transaction takes place.",
      "Keep ALN updated of any changes to your contact details.",
      "Refrain from organising or being involved in disputes, discussions or gatherings that are prejudicial or detrimental to ALN.",
    ],
  },
  {
    title: "Purpose of financials",
    points: [
      "ALN's financial viability is primarily funded by the membership fees collected annually from all members.",
      "Any other funds generated through other means are treated separately.",
    ],
  },
  {
    title: "Renewal & membership fee",
    points: [
      "Every member is sent a reminder to pay the membership fee, and prompt payment is advised when fees fall due.",
      "ALN may change the annual fee with prior consultation and a minimum of three months' notice.",
      "No insurance is provided during membership, and no coverage exists for losses other than direct costs between members.",
    ],
  },
  {
    title: "Termination from membership",
    points: [
      "ALN may terminate a membership immediately, in whole or in part and without refund, if a member breaches the Rules or Code and fails to remedy it within 30 days of notification.",
      "Termination also applies for fee delays beyond three reminders, insolvency or dissolution, distributing network information to non-members, ceasing normal business, or conduct that harms ALN's interests or image.",
      "Members are prohibited from setting up a network with the same objectives as ALN while being members.",
      "Any member may terminate its own membership with immediate effect without reason; the membership fee is not refunded.",
      "Voluntary exit requires four weeks' written notice, signed and dated; ALN acknowledges within four weeks and removes the member from the register.",
      "Outgoing members must settle all outstanding invoices owed to existing members, and vice versa, without delay.",
      "Terminated members must refrain from using the ALN logo.",
    ],
  },
  {
    title: "Liabilities to members",
    points: [
      "ALN is not responsible for loss of profits or any special, incidental or consequential damages arising from business transactions between members.",
      "ALN bears no responsibility for compensation claims, including attorneys' fees or costs of legal proceedings.",
      "Members are given the opportunity to verify the accuracy of any representations obtained through ALN.",
      "ALN is not responsible for losses caused by members' own acts toward each other, save for reviewing claims of non-payment of direct costs.",
      "ALN provides no insurance services and is not responsible for losses caused by or to third parties.",
    ],
  },
  {
    title: "Values & business ethics",
    points: [
      "ALN endeavours to develop, foster and broaden regional and international contacts for the benefit of every member.",
      "A strong cooperative spirit between members, with corporate social responsibility and compliance with industry laws, standards and protocols.",
      "Members cooperate in recruiting new members and building closer ties, placing every member's interests and welfare at heart.",
      "Business opportunities are shared between members, with priority on good service, protecting ALN's reputation, and continually improving service standards.",
    ],
  },
  {
    title: "Dispute settlement",
    points: [
      "In disputes between members — such as non-payment of logistics costs — ALN helps mediate and resolve the matter.",
      "Resolution uses video-conferencing and written correspondence, with documentary proof furnished.",
      "ALN acts independently and without prejudice; its decision in resolving the dispute is final.",
      "All disputes and materials used during resolution are treated with strict confidentiality.",
      "If amicable resolution fails, ALN may dispense with mediation or suggest an alternative method in the best interest of all parties.",
    ],
  },
  {
    title: "General rules",
    points: [
      "All notifications shall be in writing and served via email to ALN's network address or the member's registered address.",
      "The Code and Rules are governed by the laws of the country in which the matter arises; where they contradict, the Rules prevail.",
      "The Rules and Code bind all members who signed the application and acknowledgment forms.",
      "The Rules and Code are non-exhaustive and subject to change; notice is served via WhatsApp, email or website bulletins.",
      "Members should regularly visit ALN's website to keep track of changes.",
    ],
  },
  {
    title: "Force majeure",
    points: [
      "Neither the member nor ALN is liable for delay or failure to perform obligations due to force majeure — circumstances beyond reasonable control.",
      "This includes acts of God, lightning, earthquakes, floods, storms, explosions, fires and natural disasters, as well as war, terrorism, riots, civil commotion, sabotage, revolution and strikes.",
      "Where force majeure causes or is anticipated to cause delay, the affected party's obligations are suspended.",
    ],
  },
];

function RuleItem({
  index,
  title,
  points,
  open,
  onToggle,
}: {
  index: number;
  title: string;
  points: string[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease } }}
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-500",
        open
          ? "border-brand/25 bg-white shadow-lg shadow-brand/[0.07]"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-200/60",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left outline-none"
      >
        <span
          className={cn(
            "font-heading text-sm font-bold tabular-nums transition-colors duration-300",
            open ? "text-brand" : "text-neutral-300 group-hover:text-neutral-500",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 font-heading text-base font-semibold transition-all duration-300 sm:text-lg",
            open
              ? "text-neutral-900"
              : "text-neutral-600 group-hover:translate-x-1 group-hover:text-neutral-900",
          )}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease }}
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300",
            open
              ? "bg-brand text-white shadow-md shadow-brand/30"
              : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200",
          )}
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <ul className="ml-[1.35rem] space-y-3 border-l-2 border-brand/60 px-5 pb-6 pl-[1.55rem]">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease }}
                  className="text-sm leading-relaxed text-neutral-600"
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function MembershipRules() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 text-black sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Rules &amp; governance</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="The rules that protect every member"
            highlight={["protect"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-neutral-500">
              Clear, fair and transparent — the full framework every ALN member
              signs up to.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {rules.map((rule, i) => (
            <Reveal key={rule.title} delay={Math.min(i * 0.05, 0.3)}>
              <RuleItem
                index={i}
                title={rule.title}
                points={rule.points}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-neutral-500">
            Should you have any queries or require assistance, email us at{" "}
            <a
              href="mailto:admin1@autologisticsnetwork.com"
              className="font-semibold text-brand transition-colors hover:text-brand/80"
            >
              admin1@autologisticsnetwork.com
            </a>{" "}
            — we look forward to welcoming you as the member representing your
            country.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
