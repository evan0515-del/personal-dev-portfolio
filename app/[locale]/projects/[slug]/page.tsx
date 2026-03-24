import type {Metadata} from 'next';
import {ArrowUpRight, CalendarDays, Code2, FolderGit2, Layers3, UserRoundCog} from 'lucide-react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {Container} from '@/components/ui/container';
import {Pill} from '@/components/ui/pill';
import {Link} from '@/i18n/navigation';
import {locales, type AppLocale} from '@/i18n/routing';
import {getAllProjects, getProjectBySlug} from '@/lib/content';
import {getRepositoryUrl} from '@/lib/github';
import {buildMetadata} from '@/lib/seo';
import {formatDate} from '@/lib/utils';

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) =>
      (await getAllProjects(locale)).map((project) => ({
        locale,
        slug: project.slug
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
  const project = await getProjectBySlug(params.locale, params.slug);

  if (!project) {
    return {};
  }

  return buildMetadata({
    locale: params.locale,
    title: project.title,
    description: project.summary,
    pathname: `/projects/${project.slug}`
  });
}

export default async function ProjectDetailPage({
  params
}: {
  params: {locale: AppLocale; slug: string};
}) {
  unstable_setRequestLocale(params.locale);

  const project = await getProjectBySlug(params.locale, params.slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({locale: params.locale, namespace: 'Common'});
  const repositoryUrl = project.repository ? getRepositoryUrl(project.repository) : null;
  const statusLabel = t(`status.${project.status}`);

  return (
    <Container className="pb-24 pt-10 sm:pb-28">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <FolderGit2 className="h-4 w-4" />
        {t('backToProjects')}
      </Link>

      <section className="surface mt-6 px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <Pill>{statusLabel}</Pill>
          {project.tags?.map((tag) => (
            <Pill key={tag} tone="muted">
              {tag}
            </Pill>
          ))}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px]">
          <div>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
                >
                  {t('liveDemo')}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
              {repositoryUrl ? (
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-5 py-3 text-sm font-medium text-foreground"
                >
                  {t('sourceCode')}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <aside className="rounded-3xl border border-border/80 bg-muted/40 p-5">
            <dl className="grid gap-5 text-sm">
              <div>
                <dt className="flex items-center gap-2 font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  {t('period')}
                </dt>
                <dd className="mt-2 text-muted-foreground">{project.period}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-medium text-foreground">
                  <UserRoundCog className="h-4 w-4 text-accent" />
                  {t('role')}
                </dt>
                <dd className="mt-2 text-muted-foreground">{project.role}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-medium text-foreground">
                  <Layers3 className="h-4 w-4 text-accent" />
                  {t('stack')}
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Pill key={item} tone="muted">
                      {item}
                    </Pill>
                  ))}
                </dd>
              </div>
              {project.repositoryData ? (
                <div>
                  <dt className="flex items-center gap-2 font-medium text-foreground">
                    <Code2 className="h-4 w-4 text-accent" />
                    {t('repository')}
                  </dt>
                  <dd className="mt-2 space-y-2 text-muted-foreground">
                    <p>
                      {t('githubStars')}: {project.repositoryData.stargazers_count}
                    </p>
                    <p>
                      {t('githubForks')}: {project.repositoryData.forks_count}
                    </p>
                    {project.repositoryData.language ? (
                      <p>
                        {t('githubLanguage')}: {project.repositoryData.language}
                      </p>
                    ) : null}
                    <p>
                      {t('updated')}: {formatDate(project.repositoryData.updated_at, params.locale)}
                    </p>
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
      </section>

      <article className="prose prose-lg mt-10 max-w-none rounded-4xl border border-border/80 bg-card/72 px-6 py-8 sm:px-8 sm:py-10">
        {project.body}
      </article>
    </Container>
  );
}
