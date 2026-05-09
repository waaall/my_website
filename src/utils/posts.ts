import dayjs from 'dayjs';
import type { Lang, Post } from '@/types/post';
import { parseFrontmatter } from './frontmatter';

// Vite 编译期把 content/posts/*.md 全部打包为字符串
// 路径形如 /content/posts/<slug>.<lang>.md
const rawModules = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// 中英文按字数估算阅读时间：英文按词，中文按字
const estimateReadingTime = (text: string): number => {
  const cn = (text.match(/[一-龥]/g) || []).length;
  const en = text
    .replace(/[一-龥]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = cn / 400 + en / 220;
  return Math.max(1, Math.round(minutes));
};

// 解析文件名为 { slug, lang }
const parseFilename = (path: string): { slug: string; lang: Lang } | null => {
  const name = path.split('/').pop() || '';
  const m = /^(.+)\.(zh|en)\.md$/.exec(name);
  if (!m) return null;
  return { slug: m[1], lang: m[2] as Lang };
};

// 解析单个 markdown 模块为 Post
const buildPost = (path: string, raw: string): Post | null => {
  const meta = parseFilename(path);
  if (!meta) return null;
  const { data, content } = parseFrontmatter(raw);

  const title = (data.title as string) ?? meta.slug;
  const date = (data.date as string) ?? dayjs().format('YYYY-MM-DD');
  const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
  const summary = (data.summary as string) ?? '';
  const cover = (data.cover as string) ?? undefined;
  const draft = Boolean(data.draft);

  return {
    slug: meta.slug,
    lang: meta.lang,
    title,
    date,
    tags,
    summary,
    cover,
    draft,
    content,
    readingTime: estimateReadingTime(content),
  };
};

// 全量解析（生产构建会做 tree-shake，运行时只解析一次）
const allPosts: Post[] = Object.entries(rawModules)
  .map(([path, raw]) => buildPost(path, raw))
  .filter((p): p is Post => p !== null && !p.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// 按语言筛选
export const getPostsByLang = (lang: Lang): Post[] => allPosts.filter((p) => p.lang === lang);

// 按 slug + lang 取单篇
export const getPost = (slug: string, lang: Lang): Post | undefined =>
  allPosts.find((p) => p.slug === slug && p.lang === lang);

// 查找该 slug 对应的另一种语言版本
export const getPostOtherLang = (slug: string, lang: Lang): Post | undefined => {
  const other: Lang = lang === 'zh' ? 'en' : 'zh';
  return getPost(slug, other);
};

// 取上一篇 / 下一篇（同语言、按日期相邻）
export const getNeighbors = (slug: string, lang: Lang): { prev?: Post; next?: Post } => {
  const list = getPostsByLang(lang);
  const idx = list.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx < list.length - 1 ? list[idx + 1] : undefined,
    next: idx > 0 ? list[idx - 1] : undefined,
  };
};

// 标签聚合：返回 tag -> 文章数（按当前语言）
export const getTagCounts = (lang: Lang): Map<string, number> => {
  const map = new Map<string, number>();
  for (const post of getPostsByLang(lang)) {
    for (const tag of post.tags ?? []) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return map;
};

// 归档：按年份分组
export const getArchive = (lang: Lang): Array<{ year: string; posts: Post[] }> => {
  const groups = new Map<string, Post[]>();
  for (const post of getPostsByLang(lang)) {
    const year = dayjs(post.date).format('YYYY');
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return Array.from(groups.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, posts]) => ({ year, posts }));
};

// 仅供调试 / 构建脚本使用
export const __allPosts = allPosts;
