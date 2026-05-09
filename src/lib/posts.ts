import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang, Post } from '@/types/post';
import { otherLang } from '@/config/site';
import {
  estimateReadingTime,
  parsePostId,
  countTags,
  groupByYear,
  findNeighbors,
  sortByDateDesc,
} from './post-helpers';

// CollectionEntry → Post 业务模型
export const entryToPost = (entry: CollectionEntry<'posts'>): Post | null => {
  const meta = parsePostId(entry.id);
  if (!meta) return null;
  return {
    slug: meta.slug,
    lang: meta.lang,
    title: entry.data.title,
    date: entry.data.date,
    tags: entry.data.tags,
    summary: entry.data.summary,
    cover: entry.data.cover,
    draft: entry.data.draft,
    body: entry.body ?? '',
    readingTime: estimateReadingTime(entry.body ?? ''),
  };
};

// 全部已发布文章（draft 过滤），按日期倒序
let _cache: Post[] | null = null;
export const getAllPosts = async (): Promise<Post[]> => {
  if (_cache) return _cache;
  const entries = await getCollection('posts', ({ data }) => !data.draft);
  const posts = entries.map(entryToPost).filter((p): p is Post => p !== null);
  _cache = sortByDateDesc(posts);
  return _cache;
};

export const getPostsByLang = async (lang: Lang): Promise<Post[]> =>
  (await getAllPosts()).filter((p) => p.lang === lang);

export const getPost = async (slug: string, lang: Lang): Promise<Post | undefined> =>
  (await getAllPosts()).find((p) => p.slug === slug && p.lang === lang);

export const getPostOtherLang = async (slug: string, lang: Lang): Promise<Post | undefined> =>
  getPost(slug, otherLang(lang));

export const getNeighbors = async (
  slug: string,
  lang: Lang,
): Promise<{ prev?: Post; next?: Post }> => findNeighbors(await getPostsByLang(lang), slug);

export const getTagCounts = async (lang: Lang): Promise<Map<string, number>> =>
  countTags(await getPostsByLang(lang));

export const getArchive = async (lang: Lang): Promise<Array<{ year: string; posts: Post[] }>> =>
  groupByYear(await getPostsByLang(lang));

// 还原原始 entry 以便用 render() 渲染 markdown
export const getPostEntry = async (
  slug: string,
  lang: Lang,
): Promise<CollectionEntry<'posts'> | undefined> => {
  const entries = await getCollection('posts');
  return entries.find((e) => {
    const meta = parsePostId(e.id);
    return meta?.slug === slug && meta?.lang === lang;
  });
};
