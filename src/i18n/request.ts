import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // DEBUG: Log what we receive
  console.log('🔍 Received locale:', locale);
  console.log('🔍 Locale type:', typeof locale);

  // Don't validate, just use it
  const validLocale = locale === 'de' ? 'de' : 'en';

  console.log('✅ Using locale:', validLocale);

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});