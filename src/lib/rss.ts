import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import type { Lang } from '@/types/post';
import { siteConfig } from '@/config/site';
import { routePaths, createAbsoluteUrl } from '@/lib/routes';
import { getPostsByLang } from '@/lib/posts';

// 抽出公共逻辑：rss.xml.ts / rss.en.xml.ts 等只需调用本函数
export const buildRssFeed = async (
  context: APIContext,
  lang: Lang,
  itemLimit = 30,
): Promise<Response> => {
  const posts = (await getPostsByLang(lang)).slice(0, itemLimit);
  return rss({
    title: siteConfig.name[lang],
    description: siteConfig.description[lang],
    site: context.site ?? siteConfig.url,
    customData: `<language>${lang === 'zh' ? 'zh-CN' : 'en'}</language>`,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.summary ?? '',
      link: createAbsoluteUrl(siteConfig.url, routePaths.post(lang, post.slug)),
    })),
  });
};
