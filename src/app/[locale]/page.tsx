'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CryptoLogo from '@/components/CryptoLogo';
import { FloatingCoin } from '@/components/FloatingCoin';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import Navigation from '@/components/Navigation';
import { useEffect, useState } from 'react';

// 100+ Cryptocurrencies with verified working SVG logos
const ALL_CRYPTOS = [
  // These 100% have working SVG logos
  { symbol: 'btc', name: 'Bitcoin' },
  { symbol: 'eth', name: 'Ethereum' },
  { symbol: 'usdt', name: 'Tether' },
  { symbol: 'bnb', name: 'BNB' },
  { symbol: 'sol', name: 'Solana' },
  { symbol: 'xrp', name: 'XRP' },
  { symbol: 'usdc', name: 'USDC' },
  { symbol: 'ada', name: 'Cardano' },
  { symbol: 'doge', name: 'Dogecoin' },
  { symbol: 'trx', name: 'TRON' },
  { symbol: 'link', name: 'Chainlink' },
  { symbol: 'avax', name: 'Avalanche' },
  { symbol: 'matic', name: 'Polygon' },
  { symbol: 'dot', name: 'Polkadot' },
  { symbol: 'dai', name: 'Dai' },
  { symbol: 'ltc', name: 'Litecoin' },
  { symbol: 'uni', name: 'Uniswap' },
  { symbol: 'atom', name: 'Cosmos' },
  { symbol: 'etc', name: 'Ethereum Classic' },
  { symbol: 'xlm', name: 'Stellar' },
  { symbol: 'bch', name: 'Bitcoin Cash' },
  { symbol: 'algo', name: 'Algorand' },
  { symbol: 'vet', name: 'VeChain' },
  { symbol: 'fil', name: 'Filecoin' },
  { symbol: 'aave', name: 'Aave' },
  { symbol: 'xmr', name: 'Monero' },
  { symbol: 'eos', name: 'EOS' },
  { symbol: 'xtz', name: 'Tezos' },
  { symbol: 'mkr', name: 'Maker' },
  { symbol: 'sand', name: 'Sandbox' },
  { symbol: 'mana', name: 'Decentraland' },
  { symbol: 'grt', name: 'The Graph' },
  { symbol: 'neo', name: 'NEO' },
  { symbol: 'dash', name: 'Dash' },
  { symbol: 'zec', name: 'Zcash' },
  { symbol: 'theta', name: 'Theta' },
];

// Pick first 12 for display
const DISPLAY_CRYPTOS = ALL_CRYPTOS.slice(0, 12);

// Pick random 10 for floating background - less cluttered
const FLOATING_CRYPTOS = [...ALL_CRYPTOS]
  .sort(() => Math.random() - 0.5)
  .slice(0, 10);

// Fixed positions (no overlapping) for consistent layout
const COIN_POSITIONS = [
  { top: 15, left: 8, size: 50, delay: 0 },
  { top: 25, left: 88, size: 60, delay: 8 },
  { top: 45, left: 5, size: 55, delay: 15 },
  { top: 12, left: 45, size: 45, delay: 5 },
  { top: 65, left: 92, size: 52, delay: 12 },
  { top: 75, left: 12, size: 58, delay: 18 },
  { top: 85, left: 78, size: 48, delay: 3 },
  { top: 8, left: 92, size: 53, delay: 20 },
  { top: 88, left: 45, size: 50, delay: 10 },
  { top: 35, left: 85, size: 56, delay: 6 },
];

export default function HomePage() {
  const t = useTranslations('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Floating Coins Background - Framer Motion */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden z-0">
          {FLOATING_CRYPTOS.map((crypto, index) => (
            <FloatingCoin
              key={crypto.symbol}
              symbol={crypto.symbol}
              name={crypto.name}
              position={{
                top: COIN_POSITIONS[index].top,
                left: COIN_POSITIONS[index].left,
              }}
              size={COIN_POSITIONS[index].size}
              delay={COIN_POSITIONS[index].delay}
            />
          ))}
        </div>
      )}

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        
        {/* Heading - Now dark text on light background */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 text-gray-900 leading-tight">
          {t('hero.title')}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 text-center max-w-3xl mb-12 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link 
            href="/calculate"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {t('hero.cta.start')}
          </Link>
          <Link 
            href="/demo"
            className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg border-2 border-gray-200"
          >
            {t('hero.cta.demo')}
          </Link>
        </div>

        {/* Supported Cryptocurrencies */}
        <div className="text-center max-w-6xl">
          <p className="text-sm text-gray-600 mb-8 uppercase tracking-wider font-semibold">
            {t('hero.supported')}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {DISPLAY_CRYPTOS.map((crypto) => (
              <div 
                key={crypto.symbol}
                className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-110"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md hover:shadow-xl flex items-center justify-center transition-all p-2">
                  <CryptoLogo symbol={crypto.symbol} name={crypto.name} size={40} />
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {crypto.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>
      
      {/* Pricing Section */}
      <PricingSection />
      
    </div>
  );
}