import type { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';

// 深色主题：低对比的深灰底，避免纯黑刺眼
export const darkTheme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: '#fafafa',
    colorBgLayout: '#0f1115',
    colorBgContainer: '#15171c',
    colorText: '#e8e8e8',
    colorTextSecondary: '#a0a0a0',
    colorBorder: '#2a2d34',
    colorBorderSecondary: '#1f2229',
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    fontSize: 16,
    borderRadius: 6,
  },
};

export const darkCSSVars: Record<string, string> = {
  '--bg': '#0f1115',
  '--bg-elevated': '#15171c',
  '--bg-subtle': '#1a1d23',
  '--fg': '#e8e8e8',
  '--fg-muted': '#a0a0a0',
  '--fg-subtle': '#6b6f78',
  '--border': '#2a2d34',
  '--border-subtle': '#1f2229',
  '--accent': '#fafafa',
  '--link': '#fafafa',
  '--link-hover': '#c7c7c7',
  '--code-bg': '#1a1d23',
  '--quote-border': '#3a3d44',
  '--selection': 'rgba(250, 250, 250, 0.18)',
};
