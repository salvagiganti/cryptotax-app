import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

export type FooterLink = { label: string; href: string };

export interface FooterProps {
  className?: string;
  productLinks?: FooterLink[];
  legalLinks?: FooterLink[];
  supportLinks?: FooterLink[];
}

const defaultProduct: FooterLink[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

const defaultLegal: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const defaultSupport: FooterLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export function Footer({
  className,
  productLinks = defaultProduct,
  legalLinks = defaultLegal,
  supportLinks = defaultSupport,
}: FooterProps) {
  const year = new Date().getFullYear();

  const column = (title: string, links: FooterLink[]) => (
    <div>
      <div className="mb-3 text-sm font-semibold tracking-wide text-primary-foreground/80">
        {title}
      </div>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className={cn("bg-primary text-primary-foreground", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="text-lg font-bold">CryptoTax</div>
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="#"
              aria-label="GitHub"
              className="rounded p-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.57 5.08.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/>
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="Twitter"
              className="rounded p-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.49 11.24H16.17l-5.29-6.92-6.05 6.92H1.517l7.73-8.85L1 2.25h6.99l4.78 6.31 5.474-6.31Zm-1.16 19.5h1.832L7.01 3.6H5.06l12.024 18.15Z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {column("Product", productLinks)}
          {column("Legal", legalLinks)}
          {column("Support", supportLinks)}
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-sm text-primary-foreground/70">
          © {year} CryptoTax. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


