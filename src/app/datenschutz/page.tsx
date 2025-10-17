import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.privacy');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function DatenschutzPage() {
  const t = useTranslations('legal.privacy');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('intro.title')}
            </h2>
            <p className="text-gray-700">
              {t('intro.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('responsible.title')}
            </h2>
            <p className="text-gray-700">
              CryptoTax GmbH<br />
              Musterstraße 123<br />
              10115 Berlin<br />
              Deutschland<br /><br />
              E-Mail: datenschutz@cryptotax.de<br />
              Telefon: +49 (0) 123 456789
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('dataCollection.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('dataCollection.intro')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>{t('dataCollection.items.personal')}</li>
              <li>{t('dataCollection.items.transactions')}</li>
              <li>{t('dataCollection.items.technical')}</li>
              <li>{t('dataCollection.items.usage')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('dataUsage.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('dataUsage.intro')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>{t('dataUsage.items.service')}</li>
              <li>{t('dataUsage.items.reports')}</li>
              <li>{t('dataUsage.items.support')}</li>
              <li>{t('dataUsage.items.improvement')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('security.title')}
            </h2>
            <p className="text-gray-700">
              {t('security.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('rights.title')}
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>{t('rights.items.access')}</li>
              <li>{t('rights.items.correction')}</li>
              <li>{t('rights.items.deletion')}</li>
              <li>{t('rights.items.restriction')}</li>
              <li>{t('rights.items.portability')}</li>
              <li>{t('rights.items.objection')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('cookies.title')}
            </h2>
            <p className="text-gray-700">
              {t('cookies.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('changes.title')}
            </h2>
            <p className="text-gray-700">
              {t('changes.content')}
            </p>
          </section>

          <section className="mb-8">
            <p className="text-gray-600 text-sm">
              {t('lastUpdated')}: {new Date().toLocaleDateString('de-DE')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
