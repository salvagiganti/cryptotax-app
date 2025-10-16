'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Building2, Gift } from 'lucide-react';

export function PricingSection() {
  const t = useTranslations('pricing');

  const reports = [
    {
      id: 'basic',
      name: t('basic.name'),
      price: '€29',
      description: t('basic.description'),
      features: t.raw('basic.features') as string[]
    },
    {
      id: 'pro',
      name: t('pro.name'),
      price: '€79',
      description: t('pro.description'),
      features: t.raw('pro.features') as string[],
      popular: true
    },
    {
      id: 'premium',
      name: t('premium.name'),
      price: '€149',
      description: t('premium.description'),
      features: t.raw('premium.features') as string[]
    }
  ];

  return (
    <section id="pricing" className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Free Software Callout */}
        <motion.div
          className="mb-12 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 p-8 text-center shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Gift className="mx-auto mb-4 h-12 w-12 text-purple-600" />
          <h3 className="mb-2 text-2xl font-bold text-gray-900">
            {t('freeSoftware.title')}
          </h3>
          <p className="text-gray-600">
            {t('freeSoftware.description')}
          </p>
        </motion.div>

        {/* Report Pricing */}
        <div className="mb-20">
          <motion.h3
            className="mb-8 text-center text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
{t('reportsTitle')}
          </motion.h3>

          <div className="grid gap-6 lg:grid-cols-3">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                className={`relative rounded-2xl bg-white p-8 shadow-lg ${
                  report.popular ? 'ring-2 ring-purple-600 lg:scale-105' : 'border border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {report.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold text-white">
{t('mostPopular')}
                    </div>
                  </div>
                )}

                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  {report.name}
                </h3>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {report.price}
                  </span>
                  <span className="text-gray-600">{t('perReport')}</span>
                </div>
                <p className="mb-6 text-sm text-gray-600">
                  {report.description}
                </p>

                <ul className="space-y-3">
                  {report.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Single CTA Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-xl">
              {t('cta.button')}
            </button>
            <p className="mt-4 text-sm text-gray-600">
              {t('cta.subtext')}
            </p>
          </motion.div>
        </div>

        {/* Enterprise Plan */}
        <motion.div
          className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-8 shadow-xl lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-900">
                <Building2 className="h-4 w-4" />
{t('enterprise.badge')}
              </div>
              
              <h3 className="mb-3 text-3xl font-bold text-gray-900">
                {t('enterprise.title')}
              </h3>
              
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900">€1,499</span>
                <span className="text-xl text-gray-600">{t('enterprise.perYear')}</span>
              </div>

              <p className="mb-6 text-lg text-gray-700">
                {t('enterprise.description')}
              </p>

              <button className="rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl">
                {t('enterprise.contactSales')}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Check className="mb-2 h-6 w-6 text-purple-600" />
                <h4 className="mb-1 font-semibold text-gray-900">{t('enterprise.features.unlimitedReports.title')}</h4>
                <p className="text-sm text-gray-600">{t('enterprise.features.unlimitedReports.description')}</p>
              </div>
              
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Check className="mb-2 h-6 w-6 text-purple-600" />
                <h4 className="mb-1 font-semibold text-gray-900">{t('enterprise.features.whiteLabel.title')}</h4>
                <p className="text-sm text-gray-600">{t('enterprise.features.whiteLabel.description')}</p>
              </div>
              
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Check className="mb-2 h-6 w-6 text-purple-600" />
                <h4 className="mb-1 font-semibold text-gray-900">{t('enterprise.features.apiAccess.title')}</h4>
                <p className="text-sm text-gray-600">{t('enterprise.features.apiAccess.description')}</p>
              </div>
              
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Check className="mb-2 h-6 w-6 text-purple-600" />
                <h4 className="mb-1 font-semibold text-gray-900">{t('enterprise.features.bulkProcessing.title')}</h4>
                <p className="text-sm text-gray-600">{t('enterprise.features.bulkProcessing.description')}</p>
              </div>
              
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Check className="mb-2 h-6 w-6 text-purple-600" />
                <h4 className="mb-1 font-semibold text-gray-900">{t('enterprise.features.dedicatedSupport.title')}</h4>
                <p className="text-sm text-gray-600">{t('enterprise.features.dedicatedSupport.description')}</p>
              </div>
              
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Check className="mb-2 h-6 w-6 text-purple-600" />
                <h4 className="mb-1 font-semibold text-gray-900">{t('enterprise.features.clientManagement.title')}</h4>
                <p className="text-sm text-gray-600">{t('enterprise.features.clientManagement.description')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-purple-600" />
            <span>{t('trust.taxCompliant')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-purple-600" />
            <span>{t('trust.bankSecurity')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-purple-600" />
            <span>{t('trust.moneyBack')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}