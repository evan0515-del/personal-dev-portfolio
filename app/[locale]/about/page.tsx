import type {Metadata} from 'next';
import {BrainCircuit, Layers2, Rocket} from 'lucide-react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';

import {SectionHeading} from '@/components/blocks/section-heading';
import {Container} from '@/components/ui/container';
import type {AppLocale} from '@/i18n/routing';
import {buildMetadata} from '@/lib/seo';
import {
  engineeringPrinciples,
  experimentRoadmap,
  pickLocalizedValue,
  siteConfig,
  technologyGroups
} from '@/lib/site';

export async function generateMetadata({
  params
}: {
  params: {locale: AppLocale};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'AboutPage'});

  return buildMetadata({
    locale: params.locale,
    title: t('title'),
    description: t('description'),
    pathname: '/about'
  });
}

export default async function AboutPage({params}: {params: {locale: AppLocale}}) {
  unstable_setRequestLocale(params.locale);

  const locale = params.locale;
  const t = await getTranslations({locale, namespace: 'AboutPage'});

  return (
    <Container className="pb-24 pt-10 sm:pb-28">
      <section className="surface px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{siteConfig.jobTitle[locale]}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          {t('description')}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
          {siteConfig.availability[locale]}
        </p>
      </section>

      <section className="mt-16">
        <SectionHeading
          icon={BrainCircuit}
          title={t('principlesTitle')}
          description={t('principlesDescription')}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {engineeringPrinciples.map((principle) => (
            <article key={principle.title.en} className="surface px-6 py-6">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                {pickLocalizedValue(principle.title, locale)}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {pickLocalizedValue(principle.description, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="surface px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <Layers2 className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              {locale === 'zh' ? '技术组合' : 'Technology stack'}
            </h2>
          </div>
          <div className="mt-6 space-y-6">
            {technologyGroups.map((group) => (
              <div key={group.title.en}>
                <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {pickLocalizedValue(group.title, locale)}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/80 bg-muted/50 px-3 py-2 text-sm text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface px-6 py-6 sm:px-8">
          <SectionHeading
            className="mb-6"
            icon={Rocket}
            title={t('experimentsTitle')}
            description={t('experimentsDescription')}
          />
          <div className="grid gap-4">
            {experimentRoadmap.map((item) => (
              <article key={item.title.en} className="rounded-3xl border border-border/80 bg-muted/40 p-5">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {pickLocalizedValue(item.title, locale)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {pickLocalizedValue(item.description, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
