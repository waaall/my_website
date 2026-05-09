import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { PluggableList } from 'unified';
import { markdownConfig } from '@/config/markdown';
import { useI18n } from '@/hooks/useI18n';
import 'highlight.js/styles/github.css';
import '@/styles/markdown.css';

// 在默认白名单基础上放开常用 className（用于 highlight.js）
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), ['className']],
    span: [...(defaultSchema.attributes?.span || []), ['className']],
    div: [...(defaultSchema.attributes?.div || []), ['className']],
    h1: [...(defaultSchema.attributes?.h1 || []), ['id']],
    h2: [...(defaultSchema.attributes?.h2 || []), ['id']],
    h3: [...(defaultSchema.attributes?.h3 || []), ['id']],
    h4: [...(defaultSchema.attributes?.h4 || []), ['id']],
    a: [
      ...(defaultSchema.attributes?.a || []),
      ['ariaHidden'],
      ['ariaLabel'],
      ['tabIndex'],
      ['className'],
    ],
  },
};

interface Props {
  content: string;
}

// 文章正文渲染器
export const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  const { t } = useI18n();

  const rehypePlugins = useMemo<PluggableList>(
    () => [
      rehypeHighlight,
      [rehypeSanitize, sanitizeSchema],
      // 先 sanitize 再生成标题 id，避免 sanitize 的 clobberPrefix 改写 TOC 锚点
      [rehypeSlug, { prefix: markdownConfig.headingIdPrefix }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append' as const,
          properties: {
            className: ['heading-anchor'],
            ariaLabel: t.common.headingAnchor,
          },
          content: { type: 'text' as const, value: '#' },
        },
      ],
    ],
    [t.common.headingAnchor],
  );

  return (
    <article className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rehypePlugins}>
        {content}
      </ReactMarkdown>
    </article>
  );
};
