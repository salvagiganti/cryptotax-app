import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.terms');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AGBPage() {
  const t = await getTranslations('legal.terms');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              § 1 Geltungsbereich
            </h2>
            <p className="text-gray-700">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen CryptoTax GmbH und den Nutzern der Plattform cryptotax.de.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              § 2 Leistungen
            </h2>
            <p className="text-gray-700">
              CryptoTax bietet eine Software zur Berechnung von Steuern auf Kryptowährungstransaktionen. Die Nutzung erfolgt auf eigene Verantwortung. Wir übernehmen keine Haftung für die steuerliche Korrektheit der Berechnungen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              § 3 Vertragsschluss
            </h2>
            <p className="text-gray-700">
              Der Vertrag kommt durch die Registrierung und Bestätigung zustande. Mit der Nutzung akzeptieren Sie diese AGB.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              § 4 Preise und Zahlung
            </h2>
            <p className="text-gray-700">
              Die Preise sind auf der Website angegeben. Zahlungen erfolgen per Kreditkarte, PayPal oder Überweisung. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              § 5 Haftung
            </h2>
            <p className="text-gray-700">
              CryptoTax haftet nicht für Schäden, die durch fehlerhafte Steuerberechnungen entstehen. Wir empfehlen, die Berichte durch einen Steuerberater prüfen zu lassen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              § 6 Widerrufsrecht
            </h2>
            <p className="text-gray-700">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Das Widerrufsrecht erlischt bei vollständiger Erfüllung des Vertrags (z.B. Download des Reports).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              § 7 Gerichtsstand
            </h2>
            <p className="text-gray-700">
              Es gilt deutsches Recht. Gerichtsstand ist Berlin.
            </p>
          </section>

          <section className="mb-8">
            <p className="text-gray-600 text-sm">
              Stand: {new Date().toLocaleDateString('de-DE')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}