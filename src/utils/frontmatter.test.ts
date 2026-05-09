// frontmatter 工具单测：覆盖博客文章元信息的常见写法，避免构建期解析回归
import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from './frontmatter';

describe('parseFrontmatter', () => {
  it('解析标量、行内数组与正文内容', () => {
    const parsed = parseFrontmatter(`---
title: "Hello"
date: 2026-05-09
draft: false
tags: [前端, "工具"]
---
# 正文
`);

    expect(parsed.data).toMatchObject({
      title: 'Hello',
      date: '2026-05-09',
      draft: false,
      tags: ['前端', '工具'],
    });
    expect(parsed.content).toBe('# 正文\n');
  });

  it('解析 YAML 风格的块状数组', () => {
    const parsed = parseFrontmatter(`---
tags:
  - React
  - TypeScript
---
content`);

    expect(parsed.data.tags).toEqual(['React', 'TypeScript']);
    expect(parsed.content).toBe('content');
  });

  it('没有 frontmatter 时保留原始正文', () => {
    const raw = '# 只有正文';

    expect(parseFrontmatter(raw)).toEqual({ data: {}, content: raw });
  });
});
