// 构建后生成 RSS 与 sitemap，写入 dist/
// 入口在 build 脚本里：tsc --noEmit && vite build && node --import tsx scripts/gen-feed.ts

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { siteConfig } from '../src/config/site.js';
import { parseFrontmatter } from '../src/utils/frontmatter.js';
import type { Lang } from '../src/types/post.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const POSTS_DIR = join(ROOT, 'content', 'posts');
const DIST_DIR = join(ROOT, 'dist');

interface FeedPost {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  summary: string;
  url: string;
  draft: boolean;
}

// XML 实体转义
const escape = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// 读取并解析所有 posts
const loadPosts = (): FeedPost[] => {
  if (!existsSync(POSTS_DIR)) return [];
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const out: FeedPost[] = [];
  for (const file of files) {
    const m = /^(.+)\.(zh|en)\.md$/.exec(file);
    if (!m) continue;
    const [, slug, lang] = m;
    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
    const { data } = parseFrontmatter(raw);
    if (data.draft) continue;
    out.push({
      slug,
      lang: lang as Lang,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? '1970-01-01',
      summary: (data.summary as string) ?? '',
      // HashRouter：直链锚点形如 /#/zh/posts/slug
      url: `${siteConfig.url}/#/${lang}/posts/${slug}`,
      draft: false,
    });
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
};

// 生成 RSS 2.0
const buildRss = (posts: FeedPost[], lang: Lang): string => {
  const langPosts = posts.filter((p) => p.lang === lang).slice(0, 30);
  const items = langPosts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${escape(p.url)}</link>
      <guid isPermaLink="false">${escape(p.url)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escape(p.summary)}</description>
    </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name[lang])}</title>
    <link>${escape(siteConfig.url)}</link>
    <description>${escape(siteConfig.description[lang])}</description>
    <language>${lang === 'zh' ? 'zh-CN' : 'en'}</language>
    <atom:link href="${escape(siteConfig.url)}/rss${lang === siteConfig.defaultLang ? '' : '.' + lang}.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
};

// 生成 sitemap.xml（HashRouter 下大多数搜索引擎不索引 hash 路径，仅给出主页 + 语言入口作为 hint）
const buildSitemap = (): string => {
  const urls = [`${siteConfig.url}/`, `${siteConfig.url}/#/zh`, `${siteConfig.url}/#/en`];
  const today = new Date().toISOString().split('T')[0];
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${escape(u)}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
};

const main = (): void => {
  if (!existsSync(DIST_DIR)) {
    console.error('[gen-feed] dist/ 不存在，请先 vite build');
    process.exit(1);
  }
  const posts = loadPosts();

  // 默认语言走 rss.xml；另一语言走 rss.<lang>.xml
  const defaultLang = siteConfig.defaultLang;
  const otherLang: Lang = defaultLang === 'zh' ? 'en' : 'zh';

  writeFileSync(join(DIST_DIR, 'rss.xml'), buildRss(posts, defaultLang));
  writeFileSync(join(DIST_DIR, `rss.${otherLang}.xml`), buildRss(posts, otherLang));
  writeFileSync(join(DIST_DIR, 'sitemap.xml'), buildSitemap());

  console.log(`[gen-feed] 生成 ${posts.length} 篇 → rss.xml / rss.${otherLang}.xml / sitemap.xml`);
};

main();
