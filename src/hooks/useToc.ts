import { useEffect, useMemo, useState } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 | 3
}

// 从 markdown 文本抽取 H2/H3 标题（与 rehype-slug 的 slugify 规则保持一致）
const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w一-龥-]/g, '');

export const buildToc = (markdown: string): TocItem[] => {
  const lines = markdown.split(/\r?\n/);
  const toc: TocItem[] = [];
  let inCodeBlock = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim();
      toc.push({ id: slugify(text), text, level });
    }
  }
  return toc;
};

export const useToc = (markdown: string): TocItem[] =>
  useMemo(() => buildToc(markdown), [markdown]);

// 滚动监听，返回当前激活的 toc id
export const useActiveHeading = (ids: string[]): string => {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          // 取页面顶部最近的一个
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] },
    );
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
};
