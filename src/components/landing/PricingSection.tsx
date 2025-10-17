'use client';

import { useTranslations } from 'next-intl';
import { Check, X, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PricingSection() {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Free Tier Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-lg border-2 border-purple-200 p-8 relative overflow-hidden">
            {/* Gift Icon Badge */}
            <div className="absolute top-8 right-8">
              <div className="bg-purple-100 rounded-full p-3">
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold mb-2">{t('free.name')}</h3>
              <p className="text-gray-600 mb-6">{t('free.description')}</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-purple-600">€{t('free.price')}</span>
                <span className="text-gray-500">{t('free.period')}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Inklusive */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-4">
                    Inklusive
                  </h4>
                  <ul className="space-y-3">
                    {t.raw('free.features').map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Einschränkungen */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-4">
                    Einschränkungen
                  </h4>
                  <ul className="space-y-3">
                    {t.raw('free.limitations').map((limitation: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold"
              >
                {t('free.cta')}
              </Button>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-12">
            {t('reportsTitle')}
          </h3>

          {/* Basic + Pro Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Basic Report */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2">{t('basic.name')}</h4>
                <p className="text-gray-600 text-sm mb-6">{t('basic.description')}</p>
                
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-purple-600">€{t('basic.price')}</span>
                </div>
                <span className="text-gray-500 text-sm">{t('basic.period')}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {t.raw('basic.features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700 font-semibold"
              >
                {t('basic.cta')}
              </Button>
            </div>

            {/* Pro Report - Most Popular */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-600 p-8 relative hover:shadow-2xl transition-all md:scale-105">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  {t('pro.badge')}
                </span>
              </div>

              <div className="text-center mb-6 mt-4">
                <h4 className="text-2xl font-bold mb-2">{t('pro.name')}</h4>
                <p className="text-gray-600 text-sm mb-6">{t('pro.description')}</p>
                
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-purple-600">€{t('pro.price')}</span>
                </div>
                <span className="text-gray-500 text-sm">{t('pro.period')}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {t.raw('pro.features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold"
              >
                {t('pro.cta')}
              </Button>
            </div>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wide text-purple-200">
                  {t('enterprise.badge')}
                </span>
              </div>

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <h3 className="text-4xl font-bold mb-3">{t('enterprise.name')}</h3>
                  <p className="text-xl text-purple-100 max-w-2xl">
                    {t('enterprise.description')}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-5xl font-bold mb-1">
                    €{t('enterprise.price')}
                  </div>
                  <div className="text-purple-200">{t('enterprise.period')}</div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {t.raw('enterprise.features').map((feature: any, index: number) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <Check className="h-6 w-6 text-green-400 mb-3" />
                    <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-sm text-purple-100">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="w-full bg-white text-purple-900 hover:bg-purple-50 font-bold text-lg h-14"
              >
                {t('enterprise.cta')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12 h-14 font-bold"
          >
            {t('cta.button')}
          </Button>
          <p className="text-gray-600 mt-4 text-lg">
            {t('cta.subtext')}
          </p>
        </div>
      </div>
    </section>
  );
}