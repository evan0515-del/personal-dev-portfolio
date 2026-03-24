'use client';

import {Languages} from 'lucide-react';
import {useLocale} from 'next-intl';

import {Link, usePathname} from '@/i18n/navigation';
import {locales} from '@/i18n/routing';
import {cn} from '@/lib/utils';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-card/80 p-1">
      <span className="flex h-9 w-9 items-center justify-center text-muted-foreground">
        <Languages className="h-4 w-4" />
      </span>
      {locales.map((nextLocale) => (
        <Link
          key={nextLocale}
          href={pathname}
          locale={nextLocale}
          className={cn(
            'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors',
            locale === nextLocale ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {nextLocale}
        </Link>
      ))}
    </div>
  );
}
