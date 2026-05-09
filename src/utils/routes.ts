import type { Lang } from '../types/post';

// 前端路由集中定义：页面组件只引用这里，避免到处硬编码 URL 结构
const encodePathSegment = (value: string): string => encodeURIComponent(value);

export const routePaths = {
  root: '/',
  langHome: (lang: Lang): string => `/${lang}`,
  posts: (lang: Lang): string => `/${lang}/posts`,
  post: (lang: Lang, slug: string): string => `/${lang}/posts/${encodePathSegment(slug)}`,
  tags: (lang: Lang): string => `/${lang}/tags`,
  tag: (lang: Lang, tag: string): string => `/${lang}/tags/${encodePathSegment(tag)}`,
  archive: (lang: Lang): string => `/${lang}/archive`,
  about: (lang: Lang): string => `/${lang}/about`,
  notFound: (lang: Lang): string => `/${lang}/404`,
} as const;

// 兼容旧 HashRouter 链接：/#/zh/posts/x -> /zh/posts/x
export const getLegacyHashPath = (hash: string): string | null => {
  if (!hash.startsWith('#/')) return null;

  const candidate = hash.slice(1);
  return /^\/(zh|en)(?:\/|$)/.test(candidate) ? candidate : null;
};

// 生成站点绝对地址，供 RSS / sitemap 等构建脚本复用
export const createAbsoluteUrl = (siteUrl: string, path: string): string =>
  `${siteUrl.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
