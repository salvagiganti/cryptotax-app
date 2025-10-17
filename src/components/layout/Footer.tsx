'use client';

import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className={cn("bg-gray-50 border-t", className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="text-lg font-bold text-gray-900">CryptoTax</div>
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="#"
              aria-label="GitHub"
              className="rounded p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.57 5.08.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/>
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="Twitter"
              className="rounded p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.49 11.24H16.17l-5.29-6.92-6.05 6.92H1.517l7.73-8.85L1 2.25h6.99l4.78 6.31 5.474-6.31Zm-1.16 19.5h1.832L7.01 3.6H5.06l12.024 18.15Z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:max-w-md">
          {/* Legal Links */}
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/impressum`}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {t('impressum')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/datenschutz`}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/agb`}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
          © {year} CryptoTax. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


