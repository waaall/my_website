import { useMemo } from 'react';
import {
  getPostsByLang,
  getPost,
  getPostOtherLang,
  getNeighbors,
  getTagCounts,
  getArchive,
} from '@/utils/posts';
import type { Lang } from '@/types/post';

// 列表 hook：按语言 + 可选标签筛选
export const usePostList = (lang: Lang, tag?: string) =>
  useMemo(() => {
    const all = getPostsByLang(lang);
    return tag ? all.filter((p) => p.tags?.includes(tag)) : all;
  }, [lang, tag]);

export const useSinglePost = (slug: string | undefined, lang: Lang) =>
  useMemo(() => {
    if (!slug) return undefined;
    return getPost(slug, lang);
  }, [slug, lang]);

export const useOtherLangPost = (slug: string | undefined, lang: Lang) =>
  useMemo(() => {
    if (!slug) return undefined;
    return getPostOtherLang(slug, lang);
  }, [slug, lang]);

export const useNeighbors = (slug: string | undefined, lang: Lang) =>
  useMemo(() => {
    if (!slug) return {};
    return getNeighbors(slug, lang);
  }, [slug, lang]);

export const useTagCounts = (lang: Lang) =>
  useMemo(() => Array.from(getTagCounts(lang).entries()).sort((a, b) => b[1] - a[1]), [lang]);

export const useArchive = (lang: Lang) => useMemo(() => getArchive(lang), [lang]);
