import type { SiteConfig } from '../types/post';

// 站点级配置：所有面向"个例"的字段都集中在此，便于以后改名/换域名/换作者
export const siteConfig: SiteConfig = {
  name: {
    zh: '我的博客',
    en: 'My Blog',
  },
  description: {
    zh: '记录日常的思考、工程与阅读笔记。',
    en: 'Notes on engineering, reading, and everyday thinking.',
  },
  author: 'waaall',
  // 部署后请改成真实地址，用于 RSS / sitemap 的绝对链接
  url: 'https://waaall.github.io/my_website',
  github: 'https://github.com/waaall/my_website',
  defaultLang: 'zh',
  postsPerPage: 10,
};
