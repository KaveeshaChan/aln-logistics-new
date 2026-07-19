"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUp01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { Logo } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { contactIcons, footerLinks, site, socials } from "@/lib/site";

const { Location01Icon, Call02Icon, Mail01Icon } = contactIcons;

const ease = [0.22, 1, 0.36, 1] as const;

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="relative h-14 w-full max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {subscribed ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease }}
            className="flex h-14 items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6"
          >
            <span className="text-gold">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
            </span>
            <p className="text-sm font-medium text-white">
              You&apos;re on the list — welcome to the network.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSubscribed(true);
            }}
            className="group flex h-14 items-center rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 backdrop-blur transition-colors duration-300 focus-within:border-gold/60 hover:border-white/30"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="group/btn flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-gold-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-gold/25"
            >
              Subscribe
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </span>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-ink text-ink-foreground"
    >
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]"
      />

      {/* Giant ALN watermark layered behind the footer content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
      >
        <motion.p
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
          className="bg-gradient-to-b from-white/[0.06] to-white/[0.01] bg-clip-text text-center font-heading text-[28vw] font-extrabold leading-none tracking-tight text-transparent lg:text-[24rem]"
        >
          ALN
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-8xl px-5 pb-10 pt-16 sm:px-8">
        {/* Newsletter band */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur lg:flex-row lg:items-center sm:p-10">
            <div className="max-w-lg">
              <h3 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Stay ahead of the trade lanes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Market intelligence, member news and conference updates —
                straight from the network, once a month. No noise.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Reveal>

        {/* Link grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Reveal delay={0.05}>
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              The Automobile Logistics Network connects handpicked freight
              forwarders and logistics providers in every major country that
              exports and imports automobiles.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:border-gold/50 hover:bg-gold hover:text-gold-foreground"
                >
                  <HugeiconsIcon icon={s.icon} size={16} />
                </motion.a>
              ))}
            </div>
          </Reveal>

          {Object.entries(footerLinks).map(([heading, links], col) => (
            <Reveal key={heading} delay={0.1 + col * 0.07}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                {heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-0 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      <span className="w-0 overflow-hidden text-gold transition-all duration-300 group-hover:w-4">
                        <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Contact strip */}
        <Reveal delay={0.15}>
          <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <ContactItem
              icon={Location01Icon}
              label="Address"
              value={site.address}
            />
            <ContactItem icon={Call02Icon} label="Phone" value={site.phone} />
            <ContactItem icon={Mail01Icon} label="Email" value={site.email} />
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-md text-white/50 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="flex items-baseline gap-1.5">
              Crafted by{" "}
              <motion.a
                href="https://shawebdesign.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sha Web Design — concept, design and development"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="group/credit relative inline-block"
              >
                <span
                  aria-hidden
                  className="absolute -inset-x-3 -inset-y-1.5 rounded-full bg-gold/15 opacity-0 blur-lg transition-opacity duration-500 group-hover/credit:opacity-100"
                />
                <motion.span
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, var(--gold) 35%, #ffffff 50%, var(--gold) 65%)",
                    backgroundSize: "200% 100%",
                  }}
                  className="relative bg-clip-text font-heading text-base font-bold tracking-tight text-transparent"
                >
                  Sha Web Design
                </motion.span>
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 block h-px w-0 rounded-full bg-gold transition-all duration-500 group-hover/credit:w-full"
                />
              </motion.a>
            </p>
            <motion.a
              href="#home"
              aria-label="Back to top"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
            >
              <HugeiconsIcon icon={ArrowUp01Icon} size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: typeof Mail01Icon;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="flex items-start gap-3"
    >
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
        <HugeiconsIcon icon={icon} size={18} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          {label}
        </p>
        <p className="mt-1 text-sm text-white/80">{value}</p>
      </div>
    </motion.div>
  );
}
