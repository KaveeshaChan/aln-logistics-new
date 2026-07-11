"use client";

import { ArrowUpRight, TextAlignJustify } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

function QuoteButton({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      render={<a href="#contact" />}
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

export function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 24);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 sm:pt-4 rounded-full">
        <nav
          className="flex h-fit w-full items-center justify-between transition-all duration-500 relative pointer-events-auto"
        >
          <a href="#home" aria-label="ALN home" className="flex-shrink-0 z-10 rounded-2xl bg-white px-5 py-2.5 shadow-lg shadow-brand/5 flex items-center justify-center">
            <Logo />
          </a>

          <NavigationMenu className="max-lg:hidden rounded-full bg-white p-1.5 shadow-lg shadow-brand/5 z-10 absolute left-1/2 -translate-x-1/2">
            <NavigationMenuList className="flex gap-1.5">
              {navLinks.map((link, i) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      "rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide outline outline-transparent transition-all",
                      i === 0
                        ? "bg-black text-white shadow-sm"
                        : "text-black hover:bg-black/5"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3 flex-shrink-0 z-10">
            <QuoteButton className="hidden lg:flex shadow-lg shadow-brand/5" />

            <div className="lg:hidden">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/90 backdrop-blur-xl p-2.5 shadow-lg shadow-brand/5 outline-none transition-colors">
                  <TextAlignJustify size={20} />
                  <span className="sr-only">Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="mt-2 w-56">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.href}>
                      <a
                        href={link.href}
                        className="w-full cursor-pointer text-sm font-medium"
                      >
                        {link.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem>
                    <a
                      href="#contact"
                      className="w-full cursor-pointer text-sm font-medium"
                    >
                      Get a Quote
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
