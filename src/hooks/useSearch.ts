import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { getPostsByLang } from '@/utils/posts';
import type { Lang, Post } from '@/types/post';

// 客户端模糊搜索：标题权重最高，标签次之，摘要再次
export const useSearch = (lang: Lang, query: string): Post[] => {
  const fuse = useMemo(() => {
    const list = getPostsByLang(lang);
    return new Fuse(list, {
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'tags', weight: 0.25 },
        { name: 'summary', weight: 0.15 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
    });
  }, [lang]);

  return useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query]);
};
