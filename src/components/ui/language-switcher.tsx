"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get current locale from pathname
  const getCurrentLocale = () => {
    const segments = pathname.split('/');
    return segments[1] && ['de', 'en'].includes(segments[1]) ? segments[1] : 'de';
  };

  const locale = getCurrentLocale();
  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    console.log('🔄 Switching from', locale, 'to', newLocale);
    console.log('📍 Current pathname:', pathname);
    
    // Remove current locale from path
    const pathWithoutLocale = pathname.replace(/^\/(en|de)/, '') || '/';
    
    // Always add the new locale prefix
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    console.log('🎯 New path:', newPath);
    
    router.push(newPath);
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "border border-gray-200 hover:border-gray-300"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Language switcher"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="uppercase">{currentLanguage.code}</span>
        <svg
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                  language.code === locale && "bg-blue-50 text-blue-700"
                )}
              >
                <span className="text-base">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {language.code === locale && (
                  <svg
                    className="ml-auto h-4 w-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
