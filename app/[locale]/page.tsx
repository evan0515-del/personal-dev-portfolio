import type {Metadata} from 'next';
import {ArrowRight, BookOpenText, Boxes, Sparkles} from 'lucide-react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';

import {SectionHeading} from '@/components/blocks/section-heading';
import {BlogCard} from '@/components/cards/blog-card';
import {ProjectCard} from '@/components/cards/project-card';
import {Container} from '@/components/ui/container';
import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';
import {getFeaturedPosts, getFeaturedProjects} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';
import {capabilityPillars, heroStats, pickLocalizedValue, siteConfig} from '@/lib/site';

export async function generateMetadata({
  params
}: {
  params: {locale: AppLocale};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});

  return buildMetadata({
    locale: params.locale,
    title: t('homeTitle'),
    description: siteConfig.intro[params.locale]
  });
}

export default async function HomePage({params}: {params: {locale: AppLocale}}) {
  unstable_setRequestLocale(params.locale);

  const locale = params.locale;
  const t = await getTranslations({locale, namespace: 'HomePage'});
  const common = await getTranslations({locale, namespace: 'Common'});

  const [projects, posts] = await Promise.all([getFeaturedProjects(locale), getFeaturedPosts(locale)]);

  return (
    <div className="pb-24 pt-8 sm:pb-28 sm:pt-10">
      <Container>
        <section className="surface px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-accent">{t('eyebrow')}</p>
              <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                {siteConfig.name}
              </h1>
              <p className="mt-3 text-lg text-accent">{siteConfig.jobTitle[locale]}</p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {t('title')}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                {siteConfig.intro[locale]}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
                >
                  {t('primaryCta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-card/70 px-5 py-3 text-sm font-medium text-foreground"
                >
                  {t('secondaryCta')}
                  <BookOpenText className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border/80 bg-muted/50 px-4 py-2">
                  {siteConfig.location[locale]}
                </span>
                <span className="rounded-full border border-border/80 bg-muted/50 px-4 py-2">
                  {siteConfig.availability[locale]}
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              {heroStats.map((stat) => (
                <div key={stat.value} className="rounded-3xl border border-border/80 bg-muted/40 p-5">
                  <p className="font-serif text-4xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                    {pickLocalizedValue(stat.label, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow={common('featured')}
            icon={Boxes}
            title={t('featuredProjectsTitle')}
            description={t('featuredProjectsDescription')}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow={common('latest')}
            icon={BookOpenText}
            title={t('latestPostsTitle')}
            description={t('latestPostsDescription')}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow={common('featured')}
            icon={Sparkles}
            title={t('pillarsTitle')}
            description={t('pillarsDescription')}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {capabilityPillars.map((pillar) => (
              <article key={pillar.title.en} className="surface px-6 py-6">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  {pickLocalizedValue(pillar.title, locale)}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {pickLocalizedValue(pillar.description, locale)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
