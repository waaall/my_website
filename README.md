# my_website

个人博客 / Personal Blog · Astro + TypeScript 静态站点，托管在 Cloudflare Workers / Pages。

支持双语文章（中 / 英）、Markdown/数学公式、暗色模式、Pagefind 全文搜索、RSS、归档、标签云。
排版风格参考 Substack / Vercel Blog：单列窄栏、衬线标题、克制配色。

> Bilingual personal blog generated as a static Astro site, hosted on Cloudflare.
> Substack/Vercel-style typography, dark mode, Pagefind search, and RSS.

---

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:4321）
npm run dev

# 生产构建（产物在 dist/，含 pagefind / rss.xml / sitemap-index.xml）
npm run build

# 本地预览构建产物
npm run preview
```

---

## 写文章

文章是带 frontmatter 的 Markdown 文件，放在 `content/posts/`。

文件命名 **必须** 是 `<slug>.<lang>.md`，slug 一致表示同一篇文章的两种语言版本：

```txt
content/posts/
├── hello-world.zh.md
├── hello-world.en.md
├── markdown-features.zh.md
└── markdown-features.en.md
```

frontmatter 字段：

```yaml
---
title: 文章标题（必填）
date: 2026-05-09 # ISO 日期，必填
tags: [前端, 工具] # 可选
summary: 一句话摘要 # 可选，列表 / RSS / 搜索摘要用
cover: /images/x.jpg # 可选，封面图扩展字段
draft: false # 可选，true 则不会出现在列表与 RSS 里
---
```

只写一种语言时，访问另一种语言会展示缺失提示，并允许切换到存在的版本。

About 页内容来自 `content/pages/about.zh.md` 和 `content/pages/about.en.md`，同样走 Astro Content Collections。

---

## 站点配置

所有站点级“个例”参数集中在 [`src/config/site.ts`](src/config/site.ts)：

```ts
export const siteConfig: SiteConfig = {
  name: { zh: '我的博客', en: 'My Blog' },
  description: { zh: '...', en: '...' },
  author: 'waaall',
  url: 'https://zxll-website.wallphysics.workers.dev',
  github: 'https://github.com/waaall/my_website',
  supportedLangs: ['zh', 'en'] as const,
  langLabels: { zh: '中文', en: 'EN' },
  defaultLang: 'zh',
  postsPerPage: 10,
};
```

路由 URL 由 [`src/lib/routes.ts`](src/lib/routes.ts) 集中生成，UI 文案在 [`src/i18n/locales.ts`](src/i18n/locales.ts)。

---

## 部署到 Cloudflare Pages / Workers

项目按根路径 `/` 静态构建，不依赖 SPA fallback。

### Cloudflare Pages 推荐配置

| 配置项                 | 值              |
| ---------------------- | --------------- |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Deploy command         | 留空            |

构建会生成 `dist/_redirects`，把 `/` 重定向到默认语言路径（当前 `/zh`）。

### Cloudflare Workers 静态资源部署

仓库包含 [`wrangler.jsonc`](wrangler.jsonc)，Workers Assets 使用：

| 配置项                 | 值                    |
| ---------------------- | --------------------- |
| Build command          | `npm run build`       |
| Build output directory | `dist`                |
| Deploy command         | `npx wrangler deploy` |

`not_found_handling` 使用 `404-page`，未知路径返回 Astro 生成的 `404.html`。

---

## 目录结构

```txt
my_website/
├── content/
│   ├── posts/                     # 文章源（双语 markdown）
│   └── pages/                     # 静态页（about 等）
├── public/                        # 静态资源
├── src/
│   ├── components/                # Astro 组件
│   ├── config/site.ts             # 站点级配置
│   ├── content.config.ts          # Content Collections schema
│   ├── i18n/locales.ts            # UI 文案
│   ├── layouts/                   # BaseLayout / PostLayout
│   ├── lib/                       # posts / routes / rss / format 等纯逻辑
│   ├── pages/                     # Astro 文件路由
│   ├── styles/                    # 全局 token 与 markdown 样式
│   └── types/                     # 共享类型
├── tests/
│   ├── unit/                      # Vitest 单测
│   └── e2e/                       # Playwright 关键路径
├── astro.config.mjs
├── eslint.config.js
├── playwright.config.ts
├── vitest.config.ts
├── wrangler.jsonc
└── package.json
```

---

## 技术栈

| 类别          | 选型                                                    |
| ------------- | ------------------------------------------------------- |
| 构建 / SSG    | Astro 5                                                 |
| 交互          | 原生 TypeScript（无 React / Preact runtime）            |
| 内容          | Astro Content Collections + Markdown                    |
| Markdown 扩展 | remark-gfm + remark-math + rehype-katex + Shiki         |
| 搜索          | Pagefind（构建期静态索引，按语言过滤）                  |
| 主题          | CSS 变量 + localStorage + 防 FOUC inline script         |
| RSS / sitemap | `@astrojs/rss` + `@astrojs/sitemap`                     |
| 质量          | ESLint + Prettier + Vitest + Playwright + `astro check` |

详细架构与决策记录见 [docs/DESIGN.md](docs/DESIGN.md)。迁移过程见 [docs/plans/astro-migration.md](docs/plans/astro-migration.md)。

---

## 常用脚本

| 命令                   | 作用                         |
| ---------------------- | ---------------------------- |
| `npm run dev`          | 启动 Astro 开发服务器        |
| `npm run build`        | 生产构建并生成 Pagefind 索引 |
| `npm run preview`      | 本地预览 dist/               |
| `npm run lint`         | ESLint 检查                  |
| `npm run format:check` | Prettier 格式检查            |
| `npm run test:run`     | 运行 Vitest 单测             |
| `npm run test:e2e`     | 运行 Playwright e2e          |

---

## License

MIT.
