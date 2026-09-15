import type { Lang } from '@/types/post';

export const physicsUrl = (lang: Lang): string =>
  lang === 'en' ? 'https://zx-physics.cn/en' : 'https://zx-physics.cn/zh';
