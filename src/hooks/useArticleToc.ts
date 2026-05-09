import { useMemo } from 'react';
import GithubSlugger from 'github-slugger';
import { markdownConfig } from '@/config/markdown';

export interface ArticleTocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*#*\s*$/;
const FENCE_RE = /^(```|~~~)/;

// 把 Markdown 标题里的常见内联语法还原成纯文本，使 TOC 与 rehype-slug 的标题文本尽量一致
const normalizeHeadingText = (raw: string): string =>
  raw
    .replace(/!\[([^\]]*)]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/[*_~]/g, '')
    .trim();

// 从 Markdown 文本抽取二/三级标题，并使用 github-slugger 保持与 rehype-slug 一致的去重规则
export const buildArticleToc = (markdown: string): ArticleTocItem[] => {
  const slugger = new GithubSlugger();
  const toc: ArticleTocItem[] = [];
  let inCodeBlock = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (FENCE_RE.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = HEADING_RE.exec(line);
    if (!match) continue;

    const text = normalizeHeadingText(match[2]);
    if (!text) continue;

    toc.push({
      id: `${markdownConfig.headingIdPrefix}${slugger.slug(text)}`,
      text,
      level: match[1].length as 2 | 3,
    });
  }

  return toc;
};

// 文章目录数据：纯计算结果使用 useMemo，避免每次渲染重复解析 Markdown
export const useArticleToc = (markdown: string): ArticleTocItem[] =>
  useMemo(() => buildArticleToc(markdown), [markdown]);
