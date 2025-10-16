'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export default function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  
  console.log('Nav translations:', t('login'), t('signup'));

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const scrollToSection = (sectionId: string) => {
    console.log('📜 Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    console.log('📍 Element found:', !!element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CryptoTax
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('#features') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('features')}
            </button>
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/pricing') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('pricing')}
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('about')}
            </Link>
          </div>

          {/* Right Side - Auth + Language */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t('login')}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">{t('signup')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
