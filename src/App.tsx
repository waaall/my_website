import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { AppRouter } from '@/routes';
import { useThemeStore } from '@/stores/themeStore';
import { useLangStore } from '@/stores/langStore';
import { lightTheme, darkTheme, lightCSSVars, darkCSSVars } from '@/theme';
import './App.css';

const App: React.FC = () => {
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const loadThemePref = useThemeStore((s) => s.loadPreference);
  const loadLangPref = useLangStore((s) => s.loadPreference);

  // 启动时加载用户偏好
  useEffect(() => {
    loadThemePref();
    loadLangPref();
  }, [loadThemePref, loadLangPref]);

  // 应用 CSS 变量到 :root
  useEffect(() => {
    const root = document.documentElement;
    const cssVars = currentTheme === 'light' ? lightCSSVars : darkCSSVars;
    Object.entries(cssVars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const antdTheme = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <ConfigProvider theme={antdTheme}>
      <div className="app-container">
        <AppRouter />
      </div>
    </ConfigProvider>
  );
};

export default App;
