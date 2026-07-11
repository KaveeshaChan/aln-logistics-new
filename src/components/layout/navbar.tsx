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
      render={<a href="#contact" />}
      className={cn(
        "group relative h-10 w-fit overflow-hidden rounded-full p-1 ps-4 pe-12 text-sm font-medium transition-all duration-500 hover:bg-primary/80 hover:ps-12 hover:pe-4",
        className,
      )}
    >
      <span className="relative z-10">Get a Quote</span>
      <div className="absolute right-1 flex size-8 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
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
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:pt-4">
        <nav
          className={cn(
            "flex h-fit w-full items-center justify-between gap-3.5 transition-all duration-500 lg:gap-6",
            sticky
              ? "rounded-full border border-border/70 bg-background/80 p-2.5 shadow-lg shadow-brand/5 backdrop-blur-xl"
              : "border border-transparent bg-background/30 p-2.5 backdrop-blur-md",
          )}
        >
          <a href="#home" aria-label="ALN home">
            <Logo />
          </a>

          <NavigationMenu className="max-lg:hidden rounded-full bg-muted p-0.5">
            <NavigationMenuList className="flex gap-0">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className="rounded-full px-2 py-2 text-sm font-medium tracking-normal text-muted-foreground outline outline-transparent transition hover:bg-background hover:text-foreground hover:shadow-xs hover:outline-border lg:px-4"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <QuoteButton className="hidden lg:flex" />

          <div className="lg:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center rounded-full border border-border bg-background p-2 outline-none transition-colors">
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
        </nav>
      </div>
    </header>
  );
}
