import 'server-only';

export interface GitHubRepository {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const GITHUB_API_BASE_URL = 'https://api.github.com';

function getGitHubUsername() {
  const username = process.env.GITHUB_USERNAME;
  if (!username || username === 'your-github-handle') {
    return null;
  }

  return username;
}

async function fetchGitHub<T>(path: string): Promise<T | null> {
  const username = getGitHubUsername();

  if (!username) {
    return null;
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers,
    next: {revalidate: 3600, tags: ['github']}
  });

  if (response.status === 404 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function getRepository(repository: string) {
  const username = getGitHubUsername();

  if (!username) {
    return null;
  }

  return fetchGitHub<GitHubRepository>(`/repos/${username}/${repository}`);
}

export async function getRepositoriesByName(repositoryNames: string[]) {
  const uniqueNames = [...new Set(repositoryNames.filter(Boolean))];

  const entries = await Promise.all(
    uniqueNames.map(async (repositoryName) => [repositoryName, await getRepository(repositoryName)] as const)
  );

  return Object.fromEntries(entries) as Record<string, GitHubRepository | null>;
}

export function getRepositoryUrl(repository: string) {
  const username = getGitHubUsername();

  if (!username) {
    return null;
  }

  return `https://github.com/${username}/${repository}`;
}
