import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/types/post';
import { parsePostId } from './post-helpers';

// 作品集卡片数据（总览页用，不含正文）
export interface PortfolioCard {
  slug: string;
  lang: Lang;
  title: string;
  summary: string;
  techStack: string[];
  order: number;
}

// 某语言下的作品列表，按 order 升序
export const getPortfolioByLang = async (lang: Lang): Promise<PortfolioCard[]> => {
  const entries = await getCollection('portfolio');
  const cards: PortfolioCard[] = [];
  for (const entry of entries) {
    const meta = parsePostId(entry.id);
    if (!meta || meta.lang !== lang) continue;
    cards.push({
      slug: meta.slug,
      lang: meta.lang,
      title: entry.data.title,
      summary: entry.data.summary,
      techStack: entry.data.techStack,
      order: entry.data.order,
    });
  }
  return cards.sort((a, b) => a.order - b.order);
};

// 详情页静态路径：每个 mdx 文件对应一个 (lang, slug)，并把 entry 传给页面渲染
export const getPortfolioPaths = async () => {
  const entries = await getCollection('portfolio');
  return entries.flatMap((entry) => {
    const meta = parsePostId(entry.id);
    return meta ? [{ params: { lang: meta.lang, slug: meta.slug }, props: { entry } }] : [];
  });
};

export type PortfolioEntry = CollectionEntry<'portfolio'>;
