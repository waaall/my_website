// 搜索排序纯函数测试：验证标题提升规则与 Pagefind 原始顺序稳定性
import { describe, expect, it } from 'vitest';
import {
  getTitlePriority,
  normalizeSearchText,
  rerankSearchResults,
  type SearchResultData,
} from '@/lib/search';

const makeResult = (title: string): SearchResultData => ({
  url: `/${title}`,
  excerpt: title,
  meta: { title },
});

describe('normalizeSearchText', () => {
  it('忽略英文大小写、标点和空白', () => {
    expect(normalizeSearchText(' Hello, World! ', 'en')).toBe('helloworld');
  });

  it('保留用于中文匹配的正文字符', () => {
    expect(normalizeSearchText('你好，世界！', 'zh')).toBe('你好世界');
  });
});

describe('getTitlePriority', () => {
  it('完全匹配高于前缀匹配和包含匹配', () => {
    expect(getTitlePriority('Hello, World', 'hello world', 'en')).toBe(3);
    expect(getTitlePriority('Hello, World Notes', 'hello world', 'en')).toBe(2);
    expect(getTitlePriority('Notes: Hello, World', 'hello world', 'en')).toBe(1);
  });
});

describe('rerankSearchResults', () => {
  it('标题命中优先于仅正文命中的结果', () => {
    const bodyMatch = makeResult('Three Questions on Logic');
    const titleMatch = makeResult('Hello, World');

    expect(rerankSearchResults([bodyMatch, titleMatch], 'world', 'en')).toEqual([
      titleMatch,
      bodyMatch,
    ]);
  });

  it('同一优先级保持 Pagefind 原始顺序且不修改输入数组', () => {
    const first = makeResult('First result');
    const second = makeResult('Second result');
    const input = [first, second];

    expect(rerankSearchResults(input, 'missing', 'en')).toEqual(input);
    expect(input).toEqual([first, second]);
  });

  it('支持中文标题包含匹配', () => {
    const bodyMatch = makeResult('心脏电生理');
    const titleMatch = makeResult('逻辑三问');

    expect(rerankSearchResults([bodyMatch, titleMatch], '逻辑', 'zh')[0]).toBe(titleMatch);
  });
});
