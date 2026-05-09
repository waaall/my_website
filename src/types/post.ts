// 文章语言
export type Lang = 'zh' | 'en';

// frontmatter 原始字段
export interface PostFrontmatter {
  title: string;
  date: string; // ISO 字符串
  tags?: string[];
  summary?: string;
  cover?: string;
  draft?: boolean;
}

// 解析后的完整文章
export interface Post extends PostFrontmatter {
  slug: string;
  lang: Lang;
  content: string; // 去除 frontmatter 的 markdown 正文
  readingTime: number; // 阅读分钟数
}

// 站点元信息（站点名、作者、URL 等）
export interface SiteConfig {
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  author: string;
  url: string; // 部署后的完整 URL，用于 RSS / sitemap
  github: string;
  defaultLang: Lang;
  postsPerPage: number;
}
