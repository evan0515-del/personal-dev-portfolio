# Personal Developer Portfolio

A production-style personal developer website built with Next.js App Router, TypeScript, Tailwind CSS, `next-intl`, local MDX content, and GitHub REST API integration.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl
- GitHub REST API
- MDX content

## Features

- Home, Projects, Blog, and About pages
- Dark/light mode toggle
- Chinese and English locale switching
- Local MDX content for projects and blog posts
- GitHub repository metadata integration
- SEO metadata, sitemap, and robots configuration
- Server-first architecture with reusable components
- FastAPI-friendly separation between UI, content, and integration layers

## Project structure

```text
.
|-- app
|   |-- [locale]
|   |   |-- about
|   |   |   `-- page.tsx
|   |   |-- blog
|   |   |   |-- [slug]
|   |   |   |   `-- page.tsx
|   |   |   `-- page.tsx
|   |   |-- projects
|   |   |   |-- [slug]
|   |   |   |   `-- page.tsx
|   |   |   `-- page.tsx
|   |   |-- layout.tsx
|   |   |-- not-found.tsx
|   |   `-- page.tsx
|   |-- globals.css
|   |-- layout.tsx
|   |-- not-found.tsx
|   |-- robots.ts
|   `-- sitemap.ts
|-- components
|   |-- blocks
|   |   `-- section-heading.tsx
|   |-- cards
|   |   |-- blog-card.tsx
|   |   `-- project-card.tsx
|   |-- layout
|   |   |-- locale-switcher.tsx
|   |   |-- site-footer.tsx
|   |   |-- site-header.tsx
|   |   `-- theme-toggle.tsx
|   |-- mdx
|   |   `-- mdx-components.tsx
|   |-- providers
|   |   `-- theme-provider.tsx
|   `-- ui
|       |-- container.tsx
|       `-- pill.tsx
|-- content
|   |-- blog
|   |   |-- en
|   |   |   |-- architecting-for-change.mdx
|   |   |   `-- designing-server-first-interfaces.mdx
|   |   `-- zh
|   |       |-- architecting-for-change.mdx
|   |       `-- designing-server-first-interfaces.mdx
|   `-- projects
|       |-- en
|       |   |-- commerce-studio.mdx
|       |   |-- control-plane-dashboard.mdx
|       |   `-- observability-lab.mdx
|       `-- zh
|           |-- commerce-studio.mdx
|           |-- control-plane-dashboard.mdx
|           `-- observability-lab.mdx
|-- i18n
|   |-- navigation.ts
|   |-- request.ts
|   `-- routing.ts
|-- lib
|   |-- content.ts
|   |-- github.ts
|   |-- seo.ts
|   |-- site.ts
|   `-- utils.ts
|-- messages
|   |-- en.json
|   `-- zh.json
|-- public
|   |-- favicon.svg
|   `-- og-image.svg
|-- types
|   `-- content.ts
|-- .env.example
|-- .eslintrc.json
|-- .gitignore
|-- middleware.ts
|-- next.config.mjs
|-- package.json
|-- postcss.config.mjs
|-- tailwind.config.ts
|-- tsconfig.json
`-- README.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env.local
# Windows cmd
copy .env.example .env.local
```

3. Update the placeholders:

- `NEXT_PUBLIC_SITE_URL` to your deployed domain
- `GITHUB_USERNAME` to your GitHub handle
- `GITHUB_TOKEN` if you want higher GitHub API rate limits
- profile details in `lib/site.ts`
- content in `content/projects/*` and `content/blog/*`

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Deployment

This project is ready for Vercel:

1. Import the repository into Vercel
2. Set the same environment variables from `.env.local`
3. Deploy

## Architecture decisions

### 1. Localized route-first structure

All user-facing pages live under `app/[locale]`, which keeps locale-aware routing explicit and works cleanly with `next-intl` middleware and static generation.

### 2. Content stored as MDX

Projects and blog posts are file-based, so the site stays portable and easy to version. This also keeps publishing independent from any CMS decision.

### 3. Clear layer separation

- `app/` handles routing and page composition
- `components/` holds reusable UI pieces
- `lib/content.ts` owns MDX parsing and content loading
- `lib/github.ts` owns external GitHub integration
- `lib/site.ts` centralizes personal profile and structured site copy

This split makes it easier to add a FastAPI service later without mixing backend concerns into UI code.

### 4. Server components by default

Pages, content loading, GitHub requests, and metadata generation stay on the server. Client components are limited to interaction-specific concerns like theme switching and locale toggling.

### 5. Extensible integration path

The current GitHub integration is isolated behind utility functions, which means future data providers or a FastAPI backend can be added behind the same boundary with minimal UI churn.

## Customization checklist

- Replace `Your Name`, email, and social links in `lib/site.ts`
- Replace seeded projects in `content/projects`
- Replace seeded posts in `content/blog`
- Point GitHub environment variables at your real repositories
- Update colors, typography, and spacing in `app/globals.css`
