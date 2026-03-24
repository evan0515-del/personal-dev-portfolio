import type {Metadata} from 'next';
import {NotebookPen} from 'lucide-react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';

import {SectionHeading} from '@/components/blocks/section-heading';
import {BlogCard} from '@/components/cards/blog-card';
import {Container} from '@/components/ui/container';
import type {AppLocale} from '@/i18n/routing';
import {getAllPosts} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: {locale: AppLocale};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'BlogPage'});

  return buildMetadata({
    locale: params.locale,
    title: t('title'),
    description: t('description'),
    pathname: '/blog'
  });
}

export default async function BlogPage({params}: {params: {locale: AppLocale}}) {
  unstable_setRequestLocale(params.locale);

  const locale = params.locale;
  const t = await getTranslations({locale, namespace: 'BlogPage'});
  const posts = await getAllPosts(locale);

  return (
    <Container className="pb-24 pt-10 sm:pb-28">
      <SectionHeading icon={NotebookPen} title={t('title')} description={t('description')} />
      {posts.length > 0 ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="surface mt-8 px-8 py-10">
          <h2 className="font-serif text-3xl font-semibold text-foreground">{t('emptyTitle')}</h2>
          <p className="mt-4 text-muted-foreground">{t('emptyDescription')}</p>
        </div>
      )}
    </Container>
  );
}
