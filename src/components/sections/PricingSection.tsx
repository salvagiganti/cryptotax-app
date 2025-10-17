'use client';

import { useTranslations } from 'next-intl';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function PricingSection() {
  const t = useTranslations('pricing');
  const swiperRef = useRef<SwiperType>();

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-purple-50/30">
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

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-purple-600" />
          </button>
          
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="h-6 w-6 text-purple-600" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-16 pt-8"
          >
            {/* Basic Report */}
            <SwiperSlide>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 mx-auto max-w-lg">
                <div className="text-center mb-8">
                  <h4 className="text-3xl font-bold mb-3">{t('basic.name')}</h4>
                  <p className="text-gray-600 mb-8">{t('basic.description')}</p>
                  
                  <div className="mb-8">
                    <span className="text-6xl font-bold text-purple-600">€{t('basic.price')}</span>
                    <span className="text-gray-500 text-lg ml-2">{t('basic.period')}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10">
                  {t.raw('basic.features').map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold text-base h-12"
                >
                  Jetzt ausprobieren
                </Button>
              </div>
            </SwiperSlide>

            {/* Pro Report - MOST POPULAR */}
            <SwiperSlide>
              <div className="relative">
                {/* Badge - OUTSIDE the card */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-xl whitespace-nowrap">
                    {t('pro.badge')}
                  </span>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-600 p-10 mx-auto max-w-lg mt-4">
                  <div className="text-center mb-8">
                    <h4 className="text-3xl font-bold mb-3">{t('pro.name')}</h4>
                    <p className="text-gray-600 mb-8">{t('pro.description')}</p>
                    
                    <div className="mb-8">
                      <span className="text-6xl font-bold text-purple-600">€{t('pro.price')}</span>
                      <span className="text-gray-500 text-lg ml-2">{t('pro.period')}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {t.raw('pro.features').map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold text-base h-12"
                  >
                    Jetzt ausprobieren
                  </Button>
                </div>
              </div>
            </SwiperSlide>

            {/* Enterprise */}
            <SwiperSlide>
              <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-3xl shadow-xl border-2 border-purple-300 p-10 mx-auto max-w-lg">
                <div className="text-center mb-8">
                  <span className="inline-block bg-purple-600 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-5">
                    {t('enterprise.badge')}
                  </span>
                  
                  <h4 className="text-3xl font-bold mb-3 text-purple-900">{t('enterprise.name')}</h4>
                  <p className="text-gray-700 mb-8">{t('enterprise.description')}</p>
                  
                  <div className="mb-8">
                    <span className="text-6xl font-bold text-purple-600">€{t('enterprise.price')}</span>
                    <span className="text-gray-600 text-lg ml-2">{t('enterprise.period')}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {t.raw('enterprise.features').map((feature: any, index: number) => (
                    <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-bold text-sm mb-1 text-gray-900">{feature.title}</h5>
                          <p className="text-xs text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base h-12"
                >
                  {t('enterprise.cta')}
                </Button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}