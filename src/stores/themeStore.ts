import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  currentTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  loadPreference: () => void;
}

const STORAGE_KEY = 'blog.theme.mode';

// 解析最终生效的主题：auto 时跟随系统
const resolve = (mode: ThemeMode): ResolvedTheme => {
  if (mode !== 'auto') return mode;
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'auto',
  currentTheme: 'light',
  setMode: (mode) => {
    localStorage.setItem(STORAGE_KEY, mode);
    set({ mode, currentTheme: resolve(mode) });
  },
  loadPreference: () => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? 'auto';
    set({ mode: saved, currentTheme: resolve(saved) });

    // 监听系统主题变化（仅 auto 模式下生效）
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        if (get().mode === 'auto') {
          set({ currentTheme: resolve('auto') });
        }
      };
      mql.addEventListener('change', handler);
    }
  },
}));
