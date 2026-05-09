import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 站点根路径：默认使用 /，适配 Cloudflare Pages / Workers / Vercel / Netlify 等根路径部署
// 如未来部署到子路径，可通过 VITE_BASE 环境变量覆盖
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE || '/';

  return {
    base,
    plugins: [react({ jsxRuntime: 'automatic' })],
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
