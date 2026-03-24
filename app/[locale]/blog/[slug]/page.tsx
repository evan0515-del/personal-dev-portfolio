import type {Metadata} from 'next';
import {CalendarDays, Clock3, NotebookText} from 'lucide-react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {Container} from '@/components/ui/container';
import {Pill} from '@/components/ui/pill';
import {Link} from '@/i18n/navigation';
import {locales, type AppLocale} from '@/i18n/routing';
import {getAllPosts, getPostBySlug} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';
import {formatDate, formatReadingTime} from '@/lib/utils';

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) =>
      (await getAllPosts(locale)).map((post) => ({
        locale,
        slug: post.slug
      }))
    )
  );

  return params.flat();
}

export async function generateMetadata({
  params
}: {
  params: {locale: AppLocale; slug: string};
}): Promise<Metadata> {
  const post = await getPostBySlug(params.locale, params.slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    locale: params.locale,
    title: post.title,
    description: post.excerpt,
    pathname: `/blog/${post.slug}`
  });
}

export default async function BlogPostPage({params}: {params: {locale: AppLocale; slug: string}}) {
  unstable_setRequestLocale(params.locale);

  const post = await getPostBySlug(params.locale, params.slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({locale: params.locale, namespace: 'Common'});

  return (
    <Container className="pb-24 pt-10 sm:pb-28">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <NotebookText className="h-4 w-4" />
        {t('backToBlog')}
      </Link>

      <section className="surface mt-6 px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Pill key={tag} tone="muted">
              {tag}
            </Pill>
          ))}
        </div>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          {post.excerpt}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-4 py-2">
            <CalendarDays className="h-4 w-4 text-accent" />
            {formatDate(post.publishedAt, params.locale)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-4 py-2">
            <Clock3 className="h-4 w-4 text-accent" />
            {formatReadingTime(post.readingTimeMinutes, params.locale)}
          </span>
        </div>
      </section>

      <article className="prose prose-lg mt-10 max-w-none rounded-4xl border border-border/80 bg-card/72 px-6 py-8 sm:px-8 sm:py-10">
        {post.body}
      </article>
    </Container>
  );
}
