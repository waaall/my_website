// @ts-check
import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { siteConfig } from './src/config/site';

// 构建完成后写出 dist/_redirects（Cloudflare Pages/Workers 用）
// 避免在 public/ 里硬编码 /zh，让默认语言的修改单点生效
/** @returns {import('astro').AstroIntegration} */
const redirectsIntegration = () => ({
  name: 'redirects-from-site-config',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const out = new URL('_redirects', dir);
      const body = `# 由 astro.config.mjs 生成；不要手改\n/   /${siteConfig.defaultLang}   301\n`;
      await writeFile(out, body, 'utf-8');
    },
  },
});

// 站点根域名来自 src/config/site.ts，避免再处硬编码
export default defineConfig({
  site: siteConfig.url,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), redirectsIntegration()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
    // Shiki 双主题：CSS 变量 + data-theme 切换
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: false,
    },
    syntaxHighlight: {
      type: 'shiki',
      // 自动给代码块包一层 div + class，方便 markdown.css 写规则
      excludeLangs: ['mermaid', 'math'],
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
