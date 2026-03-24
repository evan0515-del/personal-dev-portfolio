import type {MetadataRoute} from 'next';

import {locales} from '@/i18n/routing';
import {getAllPosts, getAllProjects} from '@/lib/content';
import {absoluteUrl} from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = locales.flatMap((locale) =>
    ['', '/projects', '/blog', '/about'].map((pathname) => ({
      url: absoluteUrl(`/${locale}${pathname}`),
      lastModified: new Date()
    }))
  );

  const [projectPages, blogPages] = await Promise.all([
    Promise.all(
      locales.map(async (locale) =>
        (await getAllProjects(locale)).map((project) => ({
          url: absoluteUrl(`/${locale}/projects/${project.slug}`),
          lastModified: new Date()
        }))
      )
    ),
    Promise.all(
      locales.map(async (locale) =>
        (await getAllPosts(locale)).map((post) => ({
          url: absoluteUrl(`/${locale}/blog/${post.slug}`),
          lastModified: new Date(post.updatedAt ?? post.publishedAt)
        }))
      )
    )
  ]);

  return [...staticPages, ...projectPages.flat(), ...blogPages.flat()];
}
