import type { Lang } from '@/types/post';

// 前端路由集中定义：页面只引用这里，避免到处硬编码 URL 结构
const encodePathSegment = (value: string): string => encodeURIComponent(value);
const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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

// 生成站点绝对地址，供 RSS / sitemap 等场景复用
export const createAbsoluteUrl = (siteUrl: string, path: string): string =>
  `${siteUrl.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

// 去掉路径开头的语言段：'/zh/posts/x' → '/posts/x'；'/zh' → '/'
export const stripLangPrefix = (pathname: string, langs: readonly Lang[]): string => {
  const langPattern = langs.map(escapeRegExp).join('|');
  const stripped = pathname.replace(new RegExp(`^/(${langPattern})(?=/|$)`), '');
  return stripped === '' ? '/' : stripped;
};

// 给无语言段路径补上语言前缀；根路径保持 '/en' 而不是 '/en/'
export const withLangPrefix = (lang: Lang, pathWithoutLang: string): string => {
  const normalized = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
  return normalized === '/' ? routePaths.langHome(lang) : `/${lang}${normalized}`;
};
