import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

import type {AppLocale} from '@/i18n/routing';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: locale === 'zh' ? 'numeric' : 'short',
    day: 'numeric'
  }).format(new Date(date));
}

export function formatReadingTime(minutes: number, locale: AppLocale) {
  const rounded = Math.max(1, Math.round(minutes));
  return locale === 'zh' ? `约 ${rounded} 分钟阅读` : `${rounded} min read`;
}

export function absoluteUrl(pathname = '/') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  return new URL(pathname, baseUrl).toString();
}
