import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文件名形如 <slug>.<lang>.md，要保留中间的点号作为 id 分隔
// 默认 generateId 会 slugify 把点号吃掉，自定义保留原始 stem
const idFromFilename = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts', generateId: idFromFilename }),
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
  loader: glob({ pattern: '**/*.md', base: './content/pages', generateId: idFromFilename }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
  }),
});

export const collections = { posts, pages };
