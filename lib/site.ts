import type {AppLocale} from '@/i18n/routing';

export type LocalizedString = Record<AppLocale, string>;

export const siteConfig = {
  name: 'Your Name',
  email: 'hello@example.com',
  githubUrl: 'https://github.com/your-github-handle',
  linkedinUrl: 'https://linkedin.com/in/your-handle',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  jobTitle: {
    en: 'Senior Full-Stack Developer',
    zh: '资深全栈开发者'
  },
  intro: {
    en: 'I build product-grade web systems with a bias for maintainability, clear UX, and room for future experiments.',
    zh: '我专注于构建产品级 Web 系统，重视可维护性、清晰体验以及未来持续试验的空间。'
  },
  location: {
    en: 'Based in Shanghai, open to remote collaboration',
    zh: '常驻上海，支持远程协作'
  },
  availability: {
    en: 'Available for product engineering, platform work, and selective consulting.',
    zh: '可参与产品工程、平台建设与高强度咨询合作。'
  }
} as const;

export const heroStats = [
  {
    value: '8+',
    label: {
      en: 'Years building web products',
      zh: 'Web 产品研发年限'
    }
  },
  {
    value: '20+',
    label: {
      en: 'Shipped experiments and internal tools',
      zh: '已交付实验项目与内部工具'
    }
  },
  {
    value: '100%',
    label: {
      en: 'App Router, server-first architecture',
      zh: 'App Router 与服务端优先架构'
    }
  }
] as const;

export const capabilityPillars = [
  {
    title: {
      en: 'Product-minded delivery',
      zh: '产品导向的交付'
    },
    description: {
      en: 'I like turning vague goals into interfaces, APIs, and workflows that feel cohesive under real usage.',
      zh: '我擅长把模糊目标拆成可落地的界面、API 与工作流，并在真实使用中保持一致性。'
    }
  },
  {
    title: {
      en: 'Systems that survive change',
      zh: '能适应变化的系统'
    },
    description: {
      en: 'Clean boundaries, typed contracts, and content-driven pages make it easier to evolve features without rewrites.',
      zh: '清晰边界、类型化契约与内容驱动页面能让系统在演进中减少重写成本。'
    }
  },
  {
    title: {
      en: 'Space for experimentation',
      zh: '保留实验空间'
    },
    description: {
      en: 'This portfolio is also a lab for trying interaction patterns, data integrations, and future backend services.',
      zh: '这个站点同时也是实验场，用于尝试交互模式、数据集成与未来后端服务。'
    }
  }
] as const;

export const engineeringPrinciples = [
  {
    title: {
      en: 'Prefer server components by default',
      zh: '默认优先使用服务端组件'
    },
    description: {
      en: 'Data fetching, content loading, and SEO metadata stay on the server; client components are reserved for interaction.',
      zh: '数据获取、内容加载与 SEO 元数据尽量留在服务端，客户端组件只承担交互职责。'
    }
  },
  {
    title: {
      en: 'Keep content portable',
      zh: '保持内容可迁移'
    },
    description: {
      en: 'Projects and posts live in local MDX files so the site can be deployed anywhere and extended without a CMS.',
      zh: '项目与博客内容都存放在本地 MDX 文件中，不依赖 CMS，也更利于迁移与扩展。'
    }
  },
  {
    title: {
      en: 'Design for an eventual backend',
      zh: '为未来后端预留边界'
    },
    description: {
      en: 'The app separates presentation, content, and integration layers so a FastAPI service can be added later with minimal churn.',
      zh: '应用将表现层、内容层与集成层拆开，后续接入 FastAPI 服务时可以尽量减少改动。'
    }
  }
] as const;

export const experimentRoadmap = [
  {
    title: {
      en: 'Analytics and writing dashboard',
      zh: '分析与写作后台'
    },
    description: {
      en: 'Add a private dashboard for post analytics, draft previews, and content quality checks.',
      zh: '后续可加入私有后台，用于文章分析、草稿预览与内容质量检查。'
    }
  },
  {
    title: {
      en: 'FastAPI-powered APIs',
      zh: 'FastAPI 驱动的 API'
    },
    description: {
      en: 'Introduce a Python service for search, recommendation experiments, or background data pipelines.',
      zh: '可引入 Python 服务承载搜索、推荐实验或后台数据管道。'
    }
  },
  {
    title: {
      en: 'Interactive project demos',
      zh: '交互式项目演示'
    },
    description: {
      en: 'Turn selected case studies into live sandboxes with feature flags and scenario switches.',
      zh: '把精选案例升级为可交互沙箱，并加入特性开关与场景切换。'
    }
  }
] as const;

export const technologyGroups = [
  {
    title: {
      en: 'Frontend',
      zh: '前端'
    },
    items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Server Components', 'MDX']
  },
  {
    title: {
      en: 'Backend-ready',
      zh: '后端预留'
    },
    items: ['FastAPI', 'REST APIs', 'Background jobs', 'Caching strategies', 'Auth boundaries']
  },
  {
    title: {
      en: 'Tooling',
      zh: '工程化'
    },
    items: ['Vercel', 'GitHub API', 'ESLint', 'Static generation', 'Incremental revalidation']
  }
] as const;

export function pickLocalizedValue<T>(value: Record<AppLocale, T>, locale: AppLocale) {
  return value[locale] ?? value.en;
}
