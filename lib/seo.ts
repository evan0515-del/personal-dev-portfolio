import type {Metadata} from 'next';

import {absoluteUrl} from '@/lib/utils';
import {siteConfig} from '@/lib/site';

const localeMap = {
  en: 'en_US',
  zh: 'zh_CN'
} as const;

export function buildMetadata({
  locale,
  title,
  description,
  pathname = ''
}: {
  locale: 'en' | 'zh';
  title: string;
  description: string;
  pathname?: string;
}): Metadata {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const localizedPath = `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        en: `/en${normalizedPath === '/' ? '' : normalizedPath}`,
        zh: `/zh${normalizedPath === '/' ? '' : normalizedPath}`
      }
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: absoluteUrl(localizedPath),
      siteName: siteConfig.name,
      locale: localeMap[locale],
      images: [
        {
          url: absoluteUrl('/og-image.svg'),
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/og-image.svg')]
    }
  };
}
