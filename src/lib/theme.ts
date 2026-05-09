// 主题管理常量与工具：所有"硬编码字符串"集中在这里

export type ThemeMode = 'light' | 'dark' | 'auto';

export const THEME_MODES: readonly ThemeMode[] = ['light', 'dark', 'auto'] as const;
export const THEME_STORAGE_KEY = 'site:theme';
export const LANG_STORAGE_KEY = 'site:lang';

// 把 mode → 实际生效主题（auto 跟随系统）
export const resolveTheme = (mode: ThemeMode, prefersDark: boolean): Exclude<ThemeMode, 'auto'> => {
  if (mode === 'auto') return prefersDark ? 'dark' : 'light';
  return mode;
};
