import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const locales = routing.locales;
export type AppLocale = (typeof routing.locales)[number];
export const defaultLocale = routing.defaultLocale;

export function isValidLocale(locale: string): locale is AppLocale {
  return routing.locales.includes(locale as AppLocale);
}
