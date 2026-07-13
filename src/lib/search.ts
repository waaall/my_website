// 搜索结果重排：仅提升标题命中，其他结果保持 Pagefind 原有相关性顺序
export interface SearchResultData {
  url: string;
  excerpt: string;
  meta: {
    title?: string;
    summary?: string;
  };
  filters?: Record<string, string[]>;
}

// 统一大小写、Unicode 形式、标点与空白，使中英文标题匹配规则保持一致
export const normalizeSearchText = (value: string, lang: string): string =>
  value
    .normalize('NFKC')
    .toLocaleLowerCase(lang)
    .replace(/[\p{P}\p{S}\s]+/gu, '');

export const getTitlePriority = (title: string, term: string, lang: string): number => {
  const normalizedTitle = normalizeSearchText(title, lang);
  const normalizedTerm = normalizeSearchText(term, lang);

  if (!normalizedTerm) return 0;
  if (normalizedTitle === normalizedTerm) return 3;
  if (normalizedTitle.startsWith(normalizedTerm)) return 2;
  if (normalizedTitle.includes(normalizedTerm)) return 1;
  return 0;
};

// 同一标题优先级内保留 Pagefind 顺序，避免前端覆盖全文索引的相关性判断
export const rerankSearchResults = <T extends SearchResultData>(
  results: readonly T[],
  term: string,
  lang: string,
): T[] =>
  results
    .map((result, originalIndex) => ({
      result,
      originalIndex,
      titlePriority: getTitlePriority(result.meta.title ?? '', term, lang),
    }))
    .sort(
      (left, right) =>
        right.titlePriority - left.titlePriority || left.originalIndex - right.originalIndex,
    )
    .map(({ result }) => result);
