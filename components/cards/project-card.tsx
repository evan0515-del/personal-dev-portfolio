import {ArrowUpRight, GitFork, Star} from 'lucide-react';
import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';
import type {ProjectSummary} from '@/types/content';

export async function ProjectCard({
  project,
  locale
}: {
  project: ProjectSummary;
  locale: AppLocale;
}) {
  const t = await getTranslations({locale, namespace: 'Common'});

  return (
    <article className="surface group flex h-full flex-col px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">
            {t(`status.${project.status}`)}
          </p>
          <h3 className="mt-3 font-serif text-3xl font-semibold text-foreground">{project.title}</h3>
        </div>
        <div className="rounded-2xl border border-border/80 bg-muted/40 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {project.period}
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-muted-foreground">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/80 bg-muted/50 px-3 py-2 text-xs font-medium text-foreground"
          >
            {item}
          </span>
        ))}
      </div>

      {project.repositoryData ? (
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 text-accent" />
            {project.repositoryData.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitFork className="h-4 w-4 text-accent" />
            {project.repositoryData.forks_count}
          </span>
          {project.repositoryData.language ? <span>{project.repositoryData.language}</span> : null}
        </div>
      ) : null}

      <Link
        href={`/projects/${project.slug}`}
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent"
      >
        {locale === 'zh' ? '查看详情' : 'View case study'}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
