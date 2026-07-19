"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Call02Icon,
  CheckmarkCircle02Icon,
  GlobalIcon,
  Location01Icon,
  Mail01Icon,
  Time04Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { site, socials } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const MAP_EMBED =
  "https://www.google.com/maps?q=No%2088%2C%20Justice%20Akbar%20Mawatha%2C%20Colombo%2002%2C%20Sri%20Lanka&z=16&output=embed";
const MAP_LINK = "https://maps.app.goo.gl/V7eYB1TT2ps23T7o7";

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function ContactHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">Contact us</span>
        </Reveal>

        <div className="mt-6 max-w-3xl">
          <Reveal delay={0.05}>
            <Eyebrow>Contact us</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="Need more info? We are always here to assist you"
            highlight={["always", "assist"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Whether you want to move a vehicle, apply for membership or simply
              learn more about the network — drop us a line and the ALN team
              will get back to you quickly.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact info cards                                                  */
/* ------------------------------------------------------------------ */

const infoCards = [
  {
    icon: Location01Icon,
    label: "Visit us",
    lines: ["No 88, Level 03, Justice Akbar Mawatha,", "Colombo 02, Sri Lanka"],
    href: MAP_LINK,
    cta: "Get directions",
  },
  {
    icon: Mail01Icon,
    label: "Email us",
    lines: [site.email],
    href: `mailto:${site.email}`,
    cta: "Write an email",
  },
  {
    icon: Call02Icon,
    label: "Call us",
    lines: [site.phone, "+94 769 71 9994"],
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    cta: "Start a call",
  },
  {
    icon: Time04Icon,
    label: "Working hours",
    lines: ["Monday – Friday", "9:00 AM – 5:30 PM (GMT+5:30)"],
  },
] as const;

function InfoCards() {
  return (
    <Stagger className="flex flex-col gap-4">
      {infoCards.map((card) => {
        const inner = (
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group flex h-full items-start gap-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-5 transition-all duration-500 hover:border-brand/25 hover:bg-white hover:shadow-xl hover:shadow-brand/[0.06] sm:p-6"
          >
            <motion.span
              whileHover={{ rotate: -6, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25"
            >
              <HugeiconsIcon icon={card.icon} size={22} />
            </motion.span>
            <div className="min-w-0">
              <p className="font-heading text-base font-bold text-neutral-900 transition-colors duration-300 group-hover:text-brand">
                {card.label}
              </p>
              {card.lines.map((line) => (
                <p
                  key={line}
                  className="mt-0.5 text-sm leading-relaxed text-neutral-600 break-words"
                >
                  {line}
                </p>
              ))}
              {"cta" in card && card.cta && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {card.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </span>
                </span>
              )}
            </div>
          </motion.div>
        );

        return (
          <Stagger.Item key={card.label}>
            {"href" in card && card.href ? (
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="block"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </Stagger.Item>
        );
      })}

      <Stagger.Item>
        <div className="flex items-center justify-between rounded-3xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-neutral-900 text-white">
              <HugeiconsIcon icon={GlobalIcon} size={22} />
            </span>
            <p className="font-heading text-base font-bold text-neutral-900">
              Follow us
            </p>
          </div>
          <div className="flex gap-2">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 340, damping: 18 }}
                className="grid size-9 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <HugeiconsIcon icon={social.icon} size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </Stagger.Item>
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

const inputStyles =
  "peer w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-300 focus:border-brand/50 focus:bg-white focus:shadow-md focus:shadow-brand/[0.06]";

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("group/field block", className)}>
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
        {label}
        <span className="text-brand">*</span>
      </span>
      <div className="relative">
        {children}
        {/* Animated underline that draws in while the field is focused */}
        <span className="pointer-events-none absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-brand transition-transform duration-500 ease-out peer-focus:scale-x-100" />
      </div>
    </label>
  );
}

const initialFields = { name: "", email: "", subject: "", message: "" };
type Fields = typeof initialFields;

const subjects = [
  "General inquiry",
  "Membership application",
  "Freight quote",
  "Conference",
  "Other",
];

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const setField =
    (key: keyof Fields) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/send-contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("request-failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        `Something went wrong sending your message. Please email us directly at ${site.email}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-full">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease }}
            className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-neutral-200 bg-white p-10 text-center shadow-xl shadow-neutral-200/60 sm:p-14"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 16,
                delay: 0.15,
              }}
              className="grid size-20 place-items-center rounded-full bg-brand/10 text-brand"
            >
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={40} />
            </motion.span>
            <h2 className="mt-6 font-heading text-3xl font-extrabold text-neutral-900">
              Message sent
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
              Thank you for reaching out — the ALN team will get back to you
              shortly. For anything urgent, email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-brand"
              >
                {site.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => {
                setFields(initialFields);
                setSubmitted(false);
              }}
              className="group mt-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-neutral-700 transition-colors hover:text-brand"
            >
              Send another message
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease }}
            className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-200/60 sm:p-10"
          >
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-neutral-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Fill in the form and we&apos;ll respond within one business day.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <input
                    required
                    autoComplete="name"
                    placeholder="e.g. John Silva"
                    className={inputStyles}
                    value={fields.name}
                    onChange={setField("name")}
                  />
                </Field>
                <Field label="Email address">
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={inputStyles}
                    value={fields.email}
                    onChange={setField("email")}
                  />
                </Field>
              </div>

              <div className="mt-6">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
                  Subject
                  <span className="text-brand">*</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => {
                    const selected = fields.subject === subject;
                    return (
                      <motion.button
                        key={subject}
                        type="button"
                        onClick={() =>
                          setFields((f) => ({ ...f, subject }))
                        }
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 22,
                        }}
                        className={cn(
                          "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                          selected
                            ? "border-brand bg-brand text-white shadow-md shadow-brand/25"
                            : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300 hover:bg-white",
                        )}
                      >
                        {subject}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <Field label="Your message" className="mt-6">
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className={cn(inputStyles, "resize-none")}
                  value={fields.message}
                  onChange={setField("message")}
                />
              </Field>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-neutral-400">
                  We&apos;ll never share your details with anyone else.
                </p>
                <motion.button
                  type="submit"
                  disabled={submitting || !fields.subject}
                  whileHover={
                    submitting ? undefined : { scale: 1.03, y: -2 }
                  }
                  whileTap={submitting ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send message"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </span>
                </motion.button>
              </div>

              <AnimatePresence>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-sm font-medium text-brand"
                  >
                    {submitError}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form + info section                                                 */
/* ------------------------------------------------------------------ */

export function ContactSection() {
  return (
    <section className="bg-white py-16 text-black sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <InfoCards />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Map                                                                 */
/* ------------------------------------------------------------------ */

export function ContactMap() {
  return (
    <section className="bg-white pb-24 text-black sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Our location</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Find us in the heart of Colombo"
            highlight={["Colombo"]}
            className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="group relative mt-10 overflow-hidden rounded-[2rem] border border-neutral-200 shadow-xl shadow-neutral-200/60"
        >
          <iframe
            title="ALN office location — No 88, Justice Akbar Mawatha, Colombo 02"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[420px] w-full border-0 grayscale-[35%] transition-all duration-700 group-hover:grayscale-0 sm:h-[480px]"
          />

          {/* Floating address card over the map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-sm"
          >
            <div className="pointer-events-auto flex items-start gap-4 rounded-3xl border border-neutral-200/80 bg-white/90 p-5 shadow-2xl shadow-black/10 backdrop-blur-md">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                <HugeiconsIcon icon={Location01Icon} size={22} />
              </span>
              <div>
                <p className="font-heading text-base font-bold text-neutral-900">
                  ALN Head Office
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">
                  {site.address}
                </p>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand"
                >
                  Open in Google Maps
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
