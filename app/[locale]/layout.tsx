import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {SiteFooter} from '@/components/layout/site-footer';
import {SiteHeader} from '@/components/layout/site-header';
import {ThemeProvider} from '@/components/providers/theme-provider';
import {isValidLocale, locales, type AppLocale} from '@/i18n/routing';
import {buildMetadata} from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: {locale: string};
}): Promise<Metadata> {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});

  return buildMetadata({
    locale: params.locale,
    title: t('defaultTitle'),
    description: t('defaultDescription')
  });
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  unstable_setRequestLocale(params.locale);

  const messages = await getMessages();
  const locale = params.locale as AppLocale;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-hero-radial" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <SiteHeader locale={locale} />
          <main className="relative">{children}</main>
          <SiteFooter locale={locale} />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
