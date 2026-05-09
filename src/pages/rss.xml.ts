import type { APIContext } from 'astro';
import { siteConfig } from '@/config/site';
import { buildRssFeed } from '@/lib/rss';

// 默认语言订阅源
export const GET = (context: APIContext) => buildRssFeed(context, siteConfig.defaultLang);
