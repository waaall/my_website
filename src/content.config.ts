import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文件名形如 <slug>.<lang>.md|mdx，要保留中间的点号作为 id 分隔
// 默认 generateId 会 slugify 把点号吃掉，自定义保留原始 stem
const idFromFilename = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/posts', generateId: idFromFilename }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/pages', generateId: idFromFilename }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
  }),
});

// 作品集：与 posts 同样按 <slug>.<lang> 拆分语言；正文写概览/工作内容，
// 卡片所需的标题、简介、技术栈、排序放 frontmatter
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/portfolio', generateId: idFromFilename }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    techStack: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { posts, pages, portfolio };
