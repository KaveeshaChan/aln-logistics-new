import { HugeiconsIcon } from "@hugeicons/react";

import { Logo } from "@/components/layout/logo";
import { contactIcons, footerLinks, site, socials } from "@/lib/site";

const { Location01Icon, Call02Icon, Mail01Icon } = contactIcons;

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

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              The Automobile Logistics Network connects handpicked freight
              forwarders and logistics providers in every major country that
              exports and imports automobiles.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-gold/50 hover:bg-gold hover:text-gold-foreground"
                >
                  <HugeiconsIcon icon={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                {heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <ContactItem icon={Location01Icon} label="Address" value={site.address} />
          <ContactItem icon={Call02Icon} label="Phone" value={site.phone} />
          <ContactItem icon={Mail01Icon} label="Email" value={site.email} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p>Concept, design &amp; development — reimagined interface.</p>
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
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
        <HugeiconsIcon icon={icon} size={18} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          {label}
        </p>
        <p className="mt-1 text-sm text-white/80">{value}</p>
      </div>
    </div>
  );
}
