import type { Lang } from '@/types/post';

// 简易 i18n：仅维护 UI 文案，文章本体走 markdown 文件
export const messages = {
  zh: {
    nav: {
      home: '首页',
      posts: '文章',
      tags: '标签',
      archive: '归档',
      about: '关于',
    },
    common: {
      search: '搜索',
      searchPlaceholder: '搜索标题、标签、摘要…',
      readMore: '阅读全文',
      readingTime: (min: number) => `约 ${min} 分钟阅读`,
      publishedOn: '发布于',
      noResults: '没有找到匹配的文章',
      loading: '加载中…',
      backToTop: '回到顶部',
      empty: '暂无内容',
      langMissing: '本文暂无中文版本',
      langSwitchTo: '查看英文版本',
      goHome: '回到首页',
      tableOfContents: '目录',
      headingAnchor: '复制章节链接',
      previous: '上一篇',
      next: '下一篇',
      tags: '标签',
      allTags: '全部标签',
      pageOf: (cur: number, total: number) => `第 ${cur} / ${total} 页`,
    },
    home: {
      latest: '最近文章',
      viewAll: '查看全部 →',
    },
    archive: {
      total: (n: number) => `共 ${n} 篇`,
    },
    notFound: {
      title: '404',
      desc: '页面不存在或已被移除。',
    },
    footer: {
      poweredBy: '由 Vite + React 构建',
    },
  },
  en: {
    nav: {
      home: 'Home',
      posts: 'Posts',
      tags: 'Tags',
      archive: 'Archive',
      about: 'About',
    },
    common: {
      search: 'Search',
      searchPlaceholder: 'Search title, tags, summary…',
      readMore: 'Read more',
      readingTime: (min: number) => `${min} min read`,
      publishedOn: 'Published on',
      noResults: 'No matching posts',
      loading: 'Loading…',
      backToTop: 'Back to top',
      empty: 'Nothing here',
      langMissing: 'This post is not available in English',
      langSwitchTo: 'View Chinese version',
      goHome: 'Back home',
      tableOfContents: 'Contents',
      headingAnchor: 'Copy section link',
      previous: 'Previous',
      next: 'Next',
      tags: 'Tags',
      allTags: 'All tags',
      pageOf: (cur: number, total: number) => `Page ${cur} of ${total}`,
    },
    home: {
      latest: 'Latest posts',
      viewAll: 'View all →',
    },
    archive: {
      total: (n: number) => `${n} posts`,
    },
    notFound: {
      title: '404',
      desc: 'This page does not exist or has been removed.',
    },
    footer: {
      poweredBy: 'Built with Vite + React',
    },
  },
} as const;

export type Messages = (typeof messages)[Lang];
