"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export type HeaderLink = {
  label: string;
  href: string;
};

export interface HeaderProps {
  className?: string;
  links?: HeaderLink[];
}

export function Header({ className, links }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks: HeaderLink[] =
    links ?? [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Login", href: "/login" },
    ];

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "shadow-sm" : "shadow-none",
        className
      )}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold text-primary">
            CryptoTax
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Main">
            {navLinks.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Login Button */}
            <Link
              href={navLinks[navLinks.length - 1].href}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {navLinks[navLinks.length - 1].label}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              className={cn("h-5 w-5", mobileOpen && "hidden")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              className={cn("h-5 w-5", !mobileOpen && "hidden")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      <div
        className={cn(
          "md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav aria-label="Mobile" className="space-y-1 border-t border-border px-4 py-3">
          {navLinks.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-foreground/5"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="px-3 py-2">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Login Button */}
          <Link
            href={navLinks[navLinks.length - 1].href}
            className="block rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {navLinks[navLinks.length - 1].label}
          </Link>
        </nav>
      </div>
    </header>
  );
}


