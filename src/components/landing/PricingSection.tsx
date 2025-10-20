'use client';

import { useTranslations } from 'next-intl';
import { Check, Sparkles, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

type PlanKey = 'starter' | 'pro' | 'business';

type PricingPlan = {
  badge?: string;
  name: string;
  description: string;
  price?: {
    monthly?: { value?: string; label?: string; note?: string };
    yearly?: { value?: string; label?: string; note?: string };
  };
  cta: string;
  features?: string[];
  upsell?: { title?: string; items?: string[] };
  example?: { title?: string; details?: string; highlight?: string };
  scaling?: { title?: string; rows?: string[] };
};

const planConfigs: Array<{ key: PlanKey; highlight?: boolean }> = [
  { key: 'starter' },
  { key: 'pro', highlight: true },
  { key: 'business' },
];

export function PricingSection() {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {planConfigs.map(({ key, highlight }) => {
            const plan = t.raw(key) as PricingPlan;
            const monthly = plan.price?.monthly;
            const yearly = plan.price?.yearly;
            const features = plan.features ?? [];
            const upsell = plan.upsell;
            const example = plan.example;
            const scaling = plan.scaling;

            return (
              <div
                key={key}
                className={`relative flex h-full flex-col rounded-3xl p-8 shadow-lg transition-all duration-300 ${
                  highlight
                    ? 'border-2 border-purple-500 bg-white/90 backdrop-blur-xl shadow-xl'
                    : 'border border-slate-200 bg-white'
                }`}
              >
                {plan.badge ? (
                  <span
                    className={`inline-flex w-max items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest ${
                      highlight
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className="mt-6 text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <div className="mt-6 space-y-4">
                  {monthly ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-purple-600">€{monthly.value}</span>
                        {monthly.label ? (
                          <span className="text-sm text-gray-500">{monthly.label}</span>
                        ) : null}
                      </div>
                      {monthly.note ? (
                        <p className="text-sm text-gray-500">{monthly.note}</p>
                      ) : null}
                    </div>
                  ) : null}

                  {yearly ? (
                    <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-semibold text-purple-700">€{yearly.value}</span>
                        {yearly.label ? (
                          <span className="text-sm text-purple-700">{yearly.label}</span>
                        ) : null}
                      </div>
                      {yearly.note ? (
                        <p className="text-sm text-purple-700">{yearly.note}</p>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 flex-1">
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {upsell || example || scaling ? (
                  <div className="mt-6 space-y-3">
                    {upsell && upsell.items && upsell.items.length > 0 ? (
                      <div className="rounded-2xl border border-purple-200 bg-purple-50/80 p-4 text-sm text-purple-800">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-600">
                          <Sparkles className="h-4 w-4" /> {upsell.title}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {upsell.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {example ? (
                      <div className="rounded-2xl bg-purple-900/95 p-4 text-sm text-purple-100">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-200">
                          <Sparkles className="h-4 w-4" /> {example.title}
                        </p>
                        {example.details ? <p className="mt-2 leading-relaxed">{example.details}</p> : null}
                        {example.highlight ? (
                          <p className="mt-2 text-base font-semibold text-white">{example.highlight}</p>
                        ) : null}
                      </div>
                    ) : null}

                    {scaling && scaling.rows && scaling.rows.length > 0 ? (
                      <div className="rounded-2xl border border-purple-200 bg-white/80 p-4 text-sm text-purple-800">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-600">
                          <TrendingUp className="h-4 w-4" /> {scaling.title}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {scaling.rows.map((row, index) => (
                            <li key={index}>{row}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <Button
                  size="lg"
                  variant={highlight ? 'default' : 'outline'}
                  className={`mt-8 w-full font-semibold shadow-md ${
                    highlight
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            className="h-14 bg-gradient-to-r from-purple-600 to-pink-600 px-12 text-lg font-bold text-white shadow-lg hover:from-purple-700 hover:to-pink-700"
          >
            {t('cta.button')}
          </Button>
          <p className="mt-4 text-lg text-gray-600">{t('cta.subtext')}</p>
        </div>
      </div>
    </section>
  );
}
