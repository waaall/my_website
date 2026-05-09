import type { APIContext, GetStaticPaths } from 'astro';
import type { Lang } from '@/types/post';
import { siteConfig } from '@/config/site';
import { buildRssFeed } from '@/lib/rss';

// 非默认语言的订阅源：文件名里的 [lang] 段由 supportedLangs 派生
// 默认语言由 src/pages/rss.xml.ts 提供
export const getStaticPaths: GetStaticPaths = () =>
  siteConfig.supportedLangs
    .filter((lang) => lang !== siteConfig.defaultLang)
    .map((lang) => ({ params: { lang } }));

export const GET = (context: APIContext) => buildRssFeed(context, context.params.lang as Lang);
