import React from 'react';
import { SunOutlined, MoonOutlined, DesktopOutlined } from '@ant-design/icons';
import { useThemeStore, type ThemeMode } from '@/stores/themeStore';

const order: ThemeMode[] = ['light', 'dark', 'auto'];
const icons: Record<ThemeMode, React.ReactNode> = {
  light: <SunOutlined />,
  dark: <MoonOutlined />,
  auto: <DesktopOutlined />,
};
const titles: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
};

// 三态循环：浅 / 深 / 跟随系统
export const ThemeSwitch: React.FC = () => {
  const { mode, setMode } = useThemeStore();
  const next = () => {
    const idx = order.indexOf(mode);
    setMode(order[(idx + 1) % order.length]);
  };
  return (
    <button
      type="button"
      onClick={next}
      aria-label={`Theme: ${titles[mode]}`}
      title={`Theme: ${titles[mode]}`}
      style={{
        padding: '6px 8px',
        color: 'var(--fg-muted)',
        borderRadius: 6,
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {icons[mode]}
    </button>
  );
};
