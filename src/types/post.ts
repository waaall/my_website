// 文章语言
export type Lang = 'zh' | 'en';

// frontmatter 原始字段（schema 解析后；date 是 Date 对象）
export interface PostFrontmatter {
  title: string;
  date: Date;
  tags: string[];
  summary?: string;
  cover?: string;
  draft: boolean;
}

// 解析后的完整文章（Astro CollectionEntry 的精简映射）
export interface Post extends PostFrontmatter {
  slug: string; // 不含语言段的纯 slug，例如 "hello-world"
  lang: Lang;
  body: string; // markdown 正文（去 frontmatter）
  readingTime: number; // 阅读分钟数
}

// 多语言键值映射（一种语言一份）
export type LangMap<T> = Record<Lang, T>;

// 站点元信息（站点名、作者、URL 等）
export interface SiteConfig {
  name: LangMap<string>;
  description: LangMap<string>;
  author: string;
  url: string; // 部署后的完整 URL，用于 RSS / sitemap
  github: string;
  supportedLangs: readonly Lang[]; // 全部支持语言
  langLabels: LangMap<string>; // 语言切换器展示名
  defaultLang: Lang;
  postsPerPage: number;
}
