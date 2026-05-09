import { create } from 'zustand';
import type { Lang } from '@/types/post';
import { siteConfig } from '@/config/site';

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  loadPreference: () => void;
}

const STORAGE_KEY = 'blog.lang';

// 检测浏览器语言，无偏好时回退到 site 默认
const detect = (): Lang => {
  if (typeof navigator === 'undefined') return siteConfig.defaultLang;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('en')) return 'en';
  return siteConfig.defaultLang;
};

export const useLangStore = create<LangState>((set) => ({
  lang: siteConfig.defaultLang,
  setLang: (lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    set({ lang });
  },
  loadPreference: () => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    set({ lang: saved ?? detect() });
  },
}));
