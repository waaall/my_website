import type { SiteConfig } from '@/types/post';

// 站点级配置：所有面向"个例"的字段都集中在此，便于以后改名/换域名/换作者
export const siteConfig: SiteConfig = {
  name: {
    zh: '我的博客',
    en: 'My Blog',
  },
  description: {
    zh: '记录日常的思考、工程与阅读笔记。',
    en: 'Notes on engineering, reading, and everyday thinking.',
  },
  author: 'waaall',
  // Cloudflare 部署后的完整地址，用于 RSS / sitemap 的绝对链接
  url: 'https://zxll-website.wallphysics.workers.dev',
  github: 'https://github.com/waaall/my_website',
  supportedLangs: ['zh', 'en'] as const,
  langLabels: {
    zh: '中文',
    en: 'EN',
  },
  defaultLang: 'zh',
  postsPerPage: 10,
};

// 给定语言返回另一种语言（用于双语切换 / 缺失语言提示）
export const otherLang = (lang: SiteConfig['supportedLangs'][number]) =>
  siteConfig.supportedLangs.find((l) => l !== lang) ?? siteConfig.defaultLang;
