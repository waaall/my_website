// 文章目录生成单测：保证 TOC id 与 rehype-slug 的 github-slugger 规则保持一致

import { describe, expect, it } from 'vitest';
import { buildArticleToc } from './useArticleToc';

describe('buildArticleToc', () => {
  it('extracts h2/h3 headings and ignores code fences', () => {
    const toc = buildArticleToc(`
# 不进入目录
## 标题与目录
### 子标题示例
\`\`\`ts
## 代码里的标题
\`\`\`
#### 不进入目录
`);

    expect(toc).toEqual([
      { id: 'section-标题与目录', text: '标题与目录', level: 2 },
      { id: 'section-子标题示例', text: '子标题示例', level: 3 },
    ]);
  });

  it('deduplicates repeated headings like rehype-slug', () => {
    const toc = buildArticleToc(`
## Repeat
## Repeat
### Repeat
`);

    expect(toc.map((item) => item.id)).toEqual([
      'section-repeat',
      'section-repeat-1',
      'section-repeat-2',
    ]);
  });

  it('normalizes common inline markdown before slugging', () => {
    const toc = buildArticleToc('## **API** and [Docs](https://example.com)');

    expect(toc[0]).toEqual({
      id: 'section-api-and-docs',
      text: 'API and Docs',
      level: 2,
    });
  });
});
