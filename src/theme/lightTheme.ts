import type { ThemeConfig } from 'antd';

// Substack/Vercel 风格的浅色主题：克制的灰阶 + 朴素强调色
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0f1115',
    colorBgLayout: '#fafafa',
    colorBgContainer: '#ffffff',
    colorText: '#1a1a1a',
    colorTextSecondary: '#5a5a5a',
    colorBorder: '#e6e6e6',
    colorBorderSecondary: '#f0f0f0',
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    fontSize: 16,
    borderRadius: 6,
  },
};

// 浅色主题对应的 CSS 变量（供原生 CSS 使用，避免组件外样式黑屏）
export const lightCSSVars: Record<string, string> = {
  '--bg': '#fafafa',
  '--bg-elevated': '#ffffff',
  '--bg-subtle': '#f4f4f5',
  '--fg': '#1a1a1a',
  '--fg-muted': '#5a5a5a',
  '--fg-subtle': '#8a8a8a',
  '--border': '#e6e6e6',
  '--border-subtle': '#f0f0f0',
  '--accent': '#0f1115',
  '--link': '#0f1115',
  '--link-hover': '#3b3b3b',
  '--code-bg': '#f4f4f5',
  '--quote-border': '#d4d4d8',
  '--selection': 'rgba(15, 17, 21, 0.12)',
};
