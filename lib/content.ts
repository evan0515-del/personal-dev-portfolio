import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import {cache} from 'react';

import matter from 'gray-matter';
import {compileMDX} from 'next-mdx-remote/rsc';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';

import {mdxComponents} from '@/components/mdx/mdx-components';
import type {AppLocale} from '@/i18n/routing';
import {getRepositoriesByName, getRepository} from '@/lib/github';
import type {BlogDetail, BlogFrontmatter, BlogSummary, ProjectDetail, ProjectFrontmatter, ProjectSummary} from '@/types/content';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function getCollectionDirectory(collection: 'blog' | 'projects', locale: AppLocale) {
  return path.join(CONTENT_ROOT, collection, locale);
}

async function readCollectionFiles<T>(collection: 'blog' | 'projects', locale: AppLocale) {
  const directory = getCollectionDirectory(collection, locale);
  const entries = await fs.readdir(directory, {withFileTypes: true});

  const mdxFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'));

  return Promise.all(
    mdxFiles.map(async (entry) => {
      const filePath = path.join(directory, entry.name);
      const source = await fs.readFile(filePath, 'utf8');
      const {data, content} = matter(source);

      return {
        slug: entry.name.replace(/\.mdx$/, ''),
        frontmatter: data as T,
        content
      };
    })
  );
}

export const getAllProjects = cache(async (locale: AppLocale): Promise<ProjectSummary[]> => {
  const files = await readCollectionFiles<ProjectFrontmatter>('projects', locale);
  const repositories = await getRepositoriesByName(
    files.map((file) => file.frontmatter.repository).filter(Boolean) as string[]
  );

  return files
    .map((file) => ({
      ...file.frontmatter,
      slug: file.slug,
      locale,
      repositoryData: file.frontmatter.repository ? repositories[file.frontmatter.repository] ?? null : null
    }))
    .sort((left, right) => {
      const leftOrder = left.order ?? 999;
      const rightOrder = right.order ?? 999;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return left.title.localeCompare(right.title);
    });
});

export const getFeaturedProjects = cache(async (locale: AppLocale, limit = 3) => {
  const projects = await getAllProjects(locale);
  return projects.filter((project) => project.featured).slice(0, limit);
});

export const getProjectBySlug = cache(async (locale: AppLocale, slug: string): Promise<ProjectDetail | null> => {
  try {
    const filePath = path.join(getCollectionDirectory('projects', locale), `${slug}.mdx`);
    const source = await fs.readFile(filePath, 'utf8');
    const {data, content} = matter(source);
    const frontmatter = data as ProjectFrontmatter;
    const compiled = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm]
        }
      }
    });

    return {
      ...frontmatter,
      slug,
      locale,
      repositoryData: frontmatter.repository ? await getRepository(frontmatter.repository) : null,
      body: compiled.content
    };
  } catch {
    return null;
  }
});

export const getAllPosts = cache(async (locale: AppLocale): Promise<BlogSummary[]> => {
  const files = await readCollectionFiles<BlogFrontmatter>('blog', locale);

  return files
    .map((file) => ({
      ...file.frontmatter,
      slug: file.slug,
      locale,
      readingTimeMinutes: Math.max(1, Math.round(readingTime(file.content).minutes))
    }))
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
});

export const getFeaturedPosts = cache(async (locale: AppLocale, limit = 2) => {
  const posts = await getAllPosts(locale);
  return posts.filter((post) => post.featured).slice(0, limit);
});

export const getPostBySlug = cache(async (locale: AppLocale, slug: string): Promise<BlogDetail | null> => {
  try {
    const filePath = path.join(getCollectionDirectory('blog', locale), `${slug}.mdx`);
    const source = await fs.readFile(filePath, 'utf8');
    const {data, content} = matter(source);
    const frontmatter = data as BlogFrontmatter;
    const compiled = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm]
        }
      }
    });

    return {
      ...frontmatter,
      slug,
      locale,
      readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      body: compiled.content
    };
  } catch {
    return null;
  }
});
