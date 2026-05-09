import { describe, expect, it } from 'vitest';
import {
  countTags,
  containsMathMarkup,
  estimateReadingTime,
  findNeighbors,
  groupByYear,
  parsePostId,
  slugifyTag,
  sortByDateDesc,
} from '@/lib/post-helpers';
import { stripLangPrefix, withLangPrefix } from '@/lib/routes';
import type { Post } from '@/types/post';

// 构造测试用的 Post，仅设置必要字段
const makePost = (overrides: Partial<Post>): Post => ({
  slug: 'x',
  lang: 'zh',
  title: 't',
  date: new Date('2026-01-01'),
  tags: [],
  draft: false,
  body: '',
  readingTime: 1,
  ...overrides,
});

describe('parsePostId', () => {
  it('解析合法 id', () => {
    expect(parsePostId('hello-world.zh')).toEqual({ slug: 'hello-world', lang: 'zh' });
    expect(parsePostId('a.b.en')).toEqual({ slug: 'a.b', lang: 'en' });
  });

  it('非法 id 返回 null', () => {
    expect(parsePostId('hello-world')).toBeNull();
    expect(parsePostId('hello-world.fr')).toBeNull();
  });
});

describe('estimateReadingTime', () => {
  it('英文按词估算', () => {
    const text = 'word '.repeat(220);
    expect(estimateReadingTime(text)).toBe(1);
    expect(estimateReadingTime('word '.repeat(440))).toBe(2);
  });

  it('中文按字估算', () => {
    expect(estimateReadingTime('字'.repeat(400))).toBe(1);
    expect(estimateReadingTime('字'.repeat(800))).toBe(2);
  });

  it('空文本至少返回 1', () => {
    expect(estimateReadingTime('')).toBe(1);
  });
});

describe('slugifyTag', () => {
  it('英文/数字保留', () => {
    expect(slugifyTag('React 19')).toBe('react-19');
  });

  it('中文也能产出非空 slug', () => {
    const s = slugifyTag('前端');
    expect(s.length).toBeGreaterThan(0);
  });
});

describe('sortByDateDesc', () => {
  it('日期倒序', () => {
    const a = makePost({ slug: 'a', date: new Date('2026-01-01') });
    const b = makePost({ slug: 'b', date: new Date('2026-03-01') });
    const c = makePost({ slug: 'c', date: new Date('2026-02-01') });
    const sorted = sortByDateDesc([a, b, c]);
    expect(sorted.map((p) => p.slug)).toEqual(['b', 'c', 'a']);
  });
});

describe('countTags', () => {
  it('累计标签数', () => {
    const posts = [
      makePost({ tags: ['a', 'b'] }),
      makePost({ tags: ['a'] }),
      makePost({ tags: [] }),
    ];
    const m = countTags(posts);
    expect(m.get('a')).toBe(2);
    expect(m.get('b')).toBe(1);
    expect(m.size).toBe(2);
  });
});

describe('groupByYear', () => {
  it('按年份分组、年份倒序', () => {
    const posts = [
      makePost({ slug: 'a', date: new Date('2024-05-01') }),
      makePost({ slug: 'b', date: new Date('2026-01-01') }),
      makePost({ slug: 'c', date: new Date('2024-12-01') }),
    ];
    const groups = groupByYear(posts);
    expect(groups.map((g) => g.year)).toEqual(['2026', '2024']);
    expect(groups[1].posts.length).toBe(2);
  });
});

describe('findNeighbors', () => {
  // 假设输入已按日期倒序：上一篇是更早的（数组里的下一个），下一篇是更新的（数组里的上一个）
  const posts = [
    makePost({ slug: 'newest', date: new Date('2026-03-01') }),
    makePost({ slug: 'middle', date: new Date('2026-02-01') }),
    makePost({ slug: 'oldest', date: new Date('2026-01-01') }),
  ];

  it('中间文章有上下篇', () => {
    const { prev, next } = findNeighbors(posts, 'middle');
    expect(prev?.slug).toBe('oldest');
    expect(next?.slug).toBe('newest');
  });

  it('最新文章无下一篇', () => {
    const { prev, next } = findNeighbors(posts, 'newest');
    expect(prev?.slug).toBe('middle');
    expect(next).toBeUndefined();
  });

  it('最旧文章无上一篇', () => {
    const { prev, next } = findNeighbors(posts, 'oldest');
    expect(prev).toBeUndefined();
    expect(next?.slug).toBe('middle');
  });

  it('未找到返回空对象', () => {
    expect(findNeighbors(posts, 'no-such')).toEqual({});
  });
});

describe('containsMathMarkup', () => {
  it('识别常见行内/块级数学公式', () => {
    expect(containsMathMarkup('Euler: $e^{i\\pi}+1=0$')).toBe(true);
    expect(containsMathMarkup('$$\\int_0^1 x^2 dx$$')).toBe(true);
    expect(containsMathMarkup('\\[ a^2 + b^2 = c^2 \\]')).toBe(true);
  });

  it('普通代码模板字符串不误判', () => {
    expect(containsMathMarkup('return `Hello, ${name}!`;')).toBe(false);
  });
});

describe('route language helpers', () => {
  it('按配置语言去掉路径前缀，且不误伤相似单词', () => {
    expect(stripLangPrefix('/zh/posts/a', ['zh', 'en'])).toBe('/posts/a');
    expect(stripLangPrefix('/en', ['zh', 'en'])).toBe('/');
    expect(stripLangPrefix('/enigma', ['zh', 'en'])).toBe('/enigma');
  });

  it('补语言前缀时规范化根路径', () => {
    expect(withLangPrefix('en', '/')).toBe('/en');
    expect(withLangPrefix('zh', 'posts/a')).toBe('/zh/posts/a');
  });
});
