"use client";

import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function QuoteButton({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      render={<a href="/quote" />}
      className={cn(
        "group relative h-10 w-fit overflow-hidden rounded-full p-1 ps-4 pe-12 text-sm font-medium transition-all duration-500 bg-brand text-white hover:bg-brand/80 hover:ps-12 hover:pe-4",
        className,
      )}
    >
      <span className="relative z-10">Get a Quote</span>
      <div className="absolute right-1 flex size-8 items-center justify-center rounded-full bg-white text-brand transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
}

/** Hamburger that morphs into an X. */
function MenuToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative z-[60] flex size-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg shadow-brand/5 outline-none transition-transform duration-300 active:scale-95"
    >
      <span className="relative block h-3.5 w-5">
        <motion.span
          animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-black"
        />
        <motion.span
          animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease }}
          className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-black"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="absolute bottom-0 left-0 block h-0.5 w-5 rounded-full bg-black"
        />
      </span>
    </button>
  );
}

const menuPanel = {
  hidden: {
    opacity: 0,
    y: -24,
    scale: 0.98,
    transition: { duration: 0.3, ease },
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease, staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const menuItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock page scroll while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            key="panel"
            variants={menuPanel}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="fixed inset-x-3 top-3 z-50 origin-top overflow-hidden rounded-3xl bg-white p-6 pt-20 shadow-2xl shadow-black/20 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    variants={menuItem}
                    className="border-b border-neutral-100 last:border-0"
                  >
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-4 active:bg-neutral-50"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-heading text-xs font-bold tabular-nums text-neutral-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-heading text-2xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-brand">
                          {link.label}
                        </span>
                      </span>
                      <span className="grid size-9 place-items-center rounded-full bg-neutral-100 text-neutral-500 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div variants={menuItem} className="mt-6">
              <a
                href="/quote"
                onClick={onClose}
                className="flex h-13 items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-transform duration-300 active:scale-[0.98]"
              >
                Get a Quote
                <ArrowUpRight size={16} />
              </a>
            </motion.div>

            <motion.div
              variants={menuItem}
              className="mt-6 flex flex-col gap-1 border-t border-neutral-100 pt-5 text-center text-xs text-neutral-500"
            >
              <a href={`mailto:${site.email}`} className="font-medium text-neutral-700 transition-colors hover:text-brand">
                {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-brand">
                {site.phone}
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const pathname = usePathname();
  // Static export serves pages with a trailing slash (e.g. "/contact/"),
  // so strip it before comparing against nav link hrefs.
  const currentPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  // Scroll spy — highlight the nav link of the section currently in view.
  // Only hash links pointing at sections on the current page are observed.
  useEffect(() => {
    setActive(null);

    const targets = navLinks
      .map((link) => {
        const hashIndex = link.href.indexOf("#");
        if (hashIndex === -1) return null;
        const el = document.querySelector(link.href.slice(hashIndex));
        return el ? { href: link.href as string, el } : null;
      })
      .filter((t): t is { href: string; el: Element } => t !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = targets.find((t) => t.el === entry.target);
          if (match) setActive(match.href);
        }
      },
      // A thin band around the middle of the viewport decides the active section
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t.el));

    // Clear the highlight when scrolled back up to the hero
    const hero = document.querySelector("#home");
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setActive(null);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto w-full max-w-8xl px-4 py-3 sm:px-6 sm:pt-4 rounded-full">
        <nav
          className="flex h-fit w-full items-center justify-between transition-all duration-500 relative pointer-events-auto"
        >
          <a href="/" aria-label="ALN home" className="flex-shrink-0 z-[60] rounded-2xl bg-white px-5 py-2.5 shadow-lg shadow-brand/5 flex items-center justify-center">
            <Logo />
          </a>

          <NavigationMenu className="max-lg:hidden rounded-full bg-white p-1.5 shadow-lg shadow-brand/5 z-10 absolute left-1/2 -translate-x-1/2">
            <NavigationMenuList className="flex gap-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href.startsWith("/") && !link.href.includes("#")
                    ? currentPath === link.href
                    : active === link.href;
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      href={link.href}
                      onClick={() => setActive(link.href)}
                      className={cn(
                        "relative rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide outline outline-transparent transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-black hover:bg-black/5",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                          className="absolute inset-0 -z-10 rounded-full bg-black shadow-sm"
                        />
                      )}
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3 flex-shrink-0 z-10">
            <QuoteButton className="hidden lg:flex shadow-lg shadow-brand/5" />

            <div className="lg:hidden">
              <MenuToggle open={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </nav>
      </div>

      <MobileMenu open={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
