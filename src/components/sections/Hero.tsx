import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroCTA {
  label: string;
  href: string;
}

export interface HeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  showIllustration?: boolean;
}

export function Hero({
  className,
  title = "Crypto Tax Made Simple",
  subtitle =
    "Automatically calculate your crypto taxes for Germany. Support for all major exchanges.",
  primaryCta = { label: "Get Started Free", href: "/signup" },
  secondaryCta = { label: "View Demo", href: "/dashboard" },
  showIllustration = true,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-b from-background to-foreground/[0.02]",
        className
      )}
    >
      {/* Subtle decorative pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.06),transparent_60%)]"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Copy */}
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild>
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            </div>
          </div>

          {/* Illustration placeholder */}
          {showIllustration ? (
            <div className="relative h-48 w-full max-w-md self-center rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-foreground/10 p-6 ring-1 ring-border sm:h-64 lg:h-72">
              <div className="h-full w-full rounded-lg border border-border bg-background/50 backdrop-blur flex items-center justify-center">
                <svg
                  viewBox="0 0 64 64"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="32" cy="32" r="20" />
                  <path d="M20 36c4 4 8 4 12 0s8-4 12 0" />
                  <path d="M26 26h12M26 30h12" />
                </svg>
              </div>
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}


