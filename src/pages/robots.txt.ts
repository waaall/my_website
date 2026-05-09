import type { APIContext } from 'astro';
import { siteConfig } from '@/config/site';
import { createAbsoluteUrl } from '@/lib/routes';

// 用 siteConfig.url 派生 sitemap 绝对地址，避免硬编码
export const GET = (_context: APIContext) =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${createAbsoluteUrl(siteConfig.url, '/sitemap-index.xml')}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
