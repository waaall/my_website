import type { Lang, LangMap } from '@/types/post';

// 作品集配置：将作品分类、文案与联系信息集中维护，避免页面中散落硬编码数据
export interface PortfolioItem {
  slug: string;
  title: LangMap<string>;
  summary: LangMap<string>;
  overview: LangMap<string>;
  work: LangMap<string[]>;
  techStack: string[];
}

export const portfolioContact = {
  // 联系邮箱：上线前请替换为你希望公开展示的邮箱
  email: 'wallphysics@gmail.com',
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'ai-agent-fullstack',
    title: {
      zh: 'AI Agent 全栈项目',
      en: 'AI Agent Full-stack Projects',
    },
    summary: {
      zh: '服务器基础设置部署、Python FastAPI Server、前端页面展示与跨平台 App。',
      en: 'Server setup, Python FastAPI server, frontend pages, and cross-platform apps.',
    },
    overview: {
      zh: '这里预留 AI Agent 全栈项目的整体说明，包括服务器基础环境、后端服务、前端页面和跨平台 App 等内容。',
      en: 'Reserved for an overview of AI Agent full-stack projects, including server environment, backend service, frontend pages, and cross-platform apps.',
    },
    work: {
      zh: ['服务器基础设置部署', 'Python FastAPI Server', '前端页面展示', '跨平台 App'],
      en: [
        'Server infrastructure setup',
        'Python FastAPI Server',
        'Frontend page presentation',
        'Cross-platform App',
      ],
    },
    techStack: ['Python', 'FastAPI', 'Frontend', 'Cross-platform App', 'Server Deployment'],
  },
  {
    slug: 'embedded-software',
    title: {
      zh: '嵌入式软件',
      en: 'Embedded Software',
    },
    summary: {
      zh: '起搏器项目与 PMU 项目中的嵌入式软件开发经历。',
      en: 'Embedded software experience in pacemaker and PMU projects.',
    },
    overview: {
      zh: '这里预留嵌入式软件相关经历说明，主要包括起搏器项目和 PMU 项目中的软件开发内容。',
      en: 'Reserved for embedded software experience, mainly covering software development in pacemaker and PMU projects.',
    },
    work: {
      zh: ['起搏器项目嵌入式软件', 'PMU 项目嵌入式软件'],
      en: ['Pacemaker project embedded software', 'PMU project embedded software'],
    },
    techStack: ['C', 'C++', 'Embedded System', 'Communication', 'Debugging'],
  },
  {
    slug: 'algorithm-tools',
    title: {
      zh: '算法与数据分析工具',
      en: 'Algorithms and Data Analysis Tools',
    },
    summary: {
      zh: 'C++ 振荡检测算法块与 PyQt 数据分析批处理软件。',
      en: 'C++ oscillation detection algorithm block and PyQt data analysis batch-processing software.',
    },
    overview: {
      zh: '这里预留算法工程化和数据分析工具相关内容，包括 C++ 振荡检测算法块和 PyQt 数据分析批处理软件。',
      en: 'Reserved for algorithm engineering and data analysis tools, including the C++ oscillation detection algorithm block and PyQt data analysis batch-processing software.',
    },
    work: {
      zh: ['C++ 振荡检测算法块', 'PyQt 数据分析批处理软件'],
      en: [
        'C++ oscillation detection algorithm block',
        'PyQt data analysis batch-processing software',
      ],
    },
    techStack: ['C++', 'Python', 'PyQt', 'Signal Processing', 'Data Analysis'],
  },
];

// 根据 slug 查找作品项，详情页与测试可复用同一逻辑
export const getPortfolioItem = (slug: string): PortfolioItem | undefined =>
  portfolioItems.find((item) => item.slug === slug);

// 为静态路径生成提供统一入口，避免页面直接关心数据结构
export const getPortfolioPaths = (langs: readonly Lang[]) =>
  langs.flatMap((lang) =>
    portfolioItems.map((item) => ({
      params: { lang, slug: item.slug },
      props: { item },
    })),
  );
