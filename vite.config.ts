import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { cloudflare } from "@cloudflare/vite-plugin";

// 站点根路径：本地开发用 /，部署到 GitHub Pages 项目仓库需要 /<repo>/
// 通过 VITE_BASE 环境变量覆盖（CI 中由 workflow 注入）
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE || (mode === 'production' ? '/my_website/' : '/');

  return {
    base,
    plugins: [react({ jsxRuntime: 'automatic' }), cloudflare()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@content': path.resolve(__dirname, './content'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            antd: ['antd', '@ant-design/icons'],
            markdown: [
              'react-markdown',
              'remark-gfm',
              'rehype-highlight',
              'rehype-sanitize',
              'rehype-slug',
              'rehype-autolink-headings',
            ],
            search: ['fuse.js'],
          },
        },
      },
      chunkSizeWarningLimit: 1200,
      minify: 'esbuild',
      target: 'esnext',
    },
  };
});