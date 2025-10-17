import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.impressum');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ImpressumPage() {
  const t = await getTranslations('legal.impressum');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('company.title')}
            </h2>
            <p className="text-gray-700">
              {t('company.name')}<br />
              {t('company.street')}<br />
              {t('company.city')}<br />
              {t('company.country')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-700">
              {t('contact.email')}: <a href="mailto:info@cryptotax.de" className="text-emerald-600 hover:text-emerald-700">info@cryptotax.de</a><br />
              {t('contact.phone')}: +49 (0) 123 456789
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('legal.title')}
            </h2>
            <p className="text-gray-700">
              {t('legal.ceo')}: Max Mustermann<br />
              {t('legal.register')}: HRB 12345<br />
              {t('legal.court')}: Amtsgericht Berlin<br />
              {t('legal.vat')}: DE123456789
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('disclaimer.title')}
            </h2>
            <p className="text-gray-700">
              {t('disclaimer.content')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}