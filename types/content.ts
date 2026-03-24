import type {ReactNode} from 'react';

import type {AppLocale} from '@/i18n/routing';
import type {GitHubRepository} from '@/lib/github';

export type ProjectStatus = 'active' | 'maintained' | 'archived';

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  excerpt?: string;
  period: string;
  role: string;
  repository?: string;
  demoUrl?: string;
  featured?: boolean;
  order?: number;
  status: ProjectStatus;
  stack: string[];
  tags?: string[];
}

export interface ProjectSummary extends ProjectFrontmatter {
  slug: string;
  locale: AppLocale;
  repositoryData: GitHubRepository | null;
}

export interface ProjectDetail extends ProjectSummary {
  body: ReactNode;
}

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  tags: string[];
}

export interface BlogSummary extends BlogFrontmatter {
  slug: string;
  locale: AppLocale;
  readingTimeMinutes: number;
}

export interface BlogDetail extends BlogSummary {
  body: ReactNode;
}
