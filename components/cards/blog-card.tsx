import {ArrowUpRight, Clock3} from 'lucide-react';

import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';
import {formatDate, formatReadingTime} from '@/lib/utils';
import type {BlogSummary} from '@/types/content';

export function BlogCard({post, locale}: {post: BlogSummary; locale: AppLocale}) {
  return (
    <article className="surface group flex h-full flex-col px-6 py-6">
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/80 bg-muted/50 px-3 py-2 text-xs font-medium text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-5 font-serif text-3xl font-semibold text-foreground">{post.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>{formatDate(post.publishedAt, locale)}</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-4 w-4 text-accent" />
          {formatReadingTime(post.readingTimeMinutes, locale)}
        </span>
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent"
      >
        {locale === 'zh' ? '阅读文章' : 'Read article'}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
