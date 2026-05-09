import GithubSlugger from 'github-slugger';
import type { Lang, Post } from '@/types/post';
import { siteConfig } from '@/config/site';

// 纯函数集合：不依赖 Astro 运行时，可独立单测

// 解析 collection id（即 "hello-world.zh"）→ { slug, lang }
// 支持的语言来自 siteConfig，避免在多处硬编码 zh|en
export const parsePostId = (id: string): { slug: string; lang: Lang } | null => {
  const langs = siteConfig.supportedLangs;
  const re = new RegExp(`^(.+)\\.(${langs.join('|')})$`);
  const m = re.exec(id);
  if (!m) return null;
  return { slug: m[1], lang: m[2] as Lang };
};

// 中英文按字数估算阅读时间：英文按词，中文按字
export const estimateReadingTime = (text: string): number => {
  const cn = (text.match(/[一-龥]/g) || []).length;
  const en = text
    .replace(/[一-龥]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = cn / 400 + en / 220;
  return Math.max(1, Math.round(minutes));
};

// 标签 → URL 安全 slug
export const slugifyTag = (tag: string): string => {
  const slugger = new GithubSlugger();
  return slugger.slug(tag);
};

// 排序：日期倒序
export const sortByDateDesc = <T extends { date: Date }>(arr: T[]): T[] =>
  [...arr].sort((a, b) => b.date.getTime() - a.date.getTime());

// 标签聚合：tag → 数量
export const countTags = (posts: Post[]): Map<string, number> => {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return map;
};

// 归档：按年份分组（年份倒序）
export const groupByYear = (posts: Post[]): Array<{ year: string; posts: Post[] }> => {
  const groups = new Map<string, Post[]>();
  for (const p of posts) {
    const year = String(p.date.getFullYear());
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(p);
  }
  return Array.from(groups.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, list]) => ({ year, posts: list }));
};

// 上下篇查找：输入按日期倒序的同语言列表
export const findNeighbors = (posts: Post[], slug: string): { prev?: Post; next?: Post } => {
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : undefined,
    next: idx > 0 ? posts[idx - 1] : undefined,
  };
};

// 粗略识别 Markdown 数学公式，仅用于决定是否按页加载 KaTeX CSS
export const containsMathMarkup = (text: string): boolean =>
  /(^|\n)\s*\$\$[\s\S]*?\$\$/.test(text) ||
  /\\\([\s\S]*?\\\)/.test(text) ||
  /\\\[[\s\S]*?\\\]/.test(text) ||
  /(^|[^\\$])\$[^$\n]+\$/.test(text);
