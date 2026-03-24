import {ArrowUpRight} from 'lucide-react';
import {getTranslations} from 'next-intl/server';

import {Container} from '@/components/ui/container';
import type {AppLocale} from '@/i18n/routing';
import {siteConfig} from '@/lib/site';

export async function SiteFooter({locale}: {locale: AppLocale}) {
  const t = await getTranslations({locale, namespace: 'Footer'});

  return (
    <footer className="relative z-10 pb-10 pt-16">
      <Container>
        <div className="surface grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-serif text-3xl font-semibold text-foreground">{siteConfig.name}</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{t('builtWith')}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{t('availability')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-4 py-3 text-sm font-medium text-foreground"
            >
              {siteConfig.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-4 py-3 text-sm font-medium text-foreground"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-4 py-3 text-sm font-medium text-foreground"
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
