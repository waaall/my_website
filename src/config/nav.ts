import type { Lang } from '@/types/post';
import { routePaths } from '@/lib/routes';
import { messages } from '@/i18n/locales';

// 主导航项定义：href 由当前语言驱动，label 来自 i18n 字典
// 添加/删除条目只需改这里
export interface NavItem {
  key: keyof typeof messages.zh.nav;
  href: (lang: Lang) => string;
}

export const mainNav: NavItem[] = [
  { key: 'home', href: (l) => routePaths.langHome(l) },
  { key: 'posts', href: (l) => routePaths.posts(l) },
  { key: 'tags', href: (l) => routePaths.tags(l) },
  { key: 'archive', href: (l) => routePaths.archive(l) },
  { key: 'about', href: (l) => routePaths.about(l) },
];
