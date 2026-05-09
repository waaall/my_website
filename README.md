# my_website

个人博客 / Personal Blog · Vite + React 19 + TypeScript，纯静态托管在 Cloudflare Workers / Pages。

支持双语文章（中 / 英）、Markdown 写作、暗色模式、客户端搜索、RSS、归档、标签云。
排版风格参考 Substack / Vercel Blog：单列窄栏、衬线标题、克制配色。

> Bilingual personal blog generated as a single-page app, hosted on Cloudflare.
> Substack/Vercel-style typography, dark mode, client-side search, and RSS.

---

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:3000）
npm run dev

# 生产构建（产物在 dist/，含 rss.xml / sitemap.xml）
npm run build

# 本地预览构建产物
npm run preview
```

---

## 写文章

文章是带 frontmatter 的 Markdown 文件，放在 `content/posts/`。

文件命名 **必须** 是 `<slug>.<lang>.md`，slug 一致表示是同一篇文章的两种语言版本：

```
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
date: 2026-05-09         # ISO 日期，必填
tags: [前端, 工具]        # 可选
summary: 一句话摘要        # 可选，列表与 RSS 用
cover: /images/x.jpg     # 可选
draft: false             # 可选，true 则不会出现在列表与 RSS 里
---
```

只写一种语言时，访问另一种语言会提示并允许一键切换到存在的版本。

About 页内容来自 `content/pages/about.zh.md` 和 `about.en.md`，用同样的 frontmatter 规则。

---

## 站点配置

所有"个例"参数（站点名、URL、作者、默认语言、每页文章数等）都集中在 [`src/config/site.ts`](src/config/site.ts)：

```ts
export const siteConfig: SiteConfig = {
  name: { zh: '我的博客', en: 'My Blog' },
  description: { zh: '...', en: '...' },
  author: 'waaall',
  url: 'https://zxll-website.wallphysics.workers.dev', // 部署后改成真实地址
  github: 'https://github.com/waaall/my_website',
  defaultLang: 'zh',
  postsPerPage: 10,
};
```

---

## 部署到 Cloudflare Pages / Workers

项目默认按根路径 `/` 构建，适合 Cloudflare Pages / Workers、Vercel、Netlify 等平台。
路由使用 `BrowserRouter`，请确保托管平台把未知路径回退到 `index.html`。

### Cloudflare Pages 推荐配置

| 配置项 | 值 |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Deploy command | 留空（Pages 项目不需要手写 `wrangler deploy`） |
| Environment variable | `VITE_BASE=/`（可选，项目默认就是 `/`） |

### Cloudflare Workers 静态资源部署

如果使用 Workers 静态资源部署，仓库已包含 [`wrangler.jsonc`](wrangler.jsonc)，Cloudflare 构建设置可使用：

| 配置项 | 值 |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Deploy command | `npx wrangler deploy` |
| Environment variable | `VITE_BASE=/`（可选） |

---

## 目录结构

```
my_website/
├── wrangler.jsonc                 # Cloudflare Workers 静态资源部署配置
├── content/
│   ├── posts/                     # 文章源（双语 markdown）
│   └── pages/                     # 静态页（about 等）
├── public/                        # 静态资源
├── scripts/
│   └── gen-feed.ts                # 构建后生成 rss / sitemap
├── src/
│   ├── components/                # Layout / Post / Common
│   ├── config/site.ts             # 站点级配置
│   ├── hooks/                     # usePosts / useSearch / useArticleToc / useI18n
│   ├── i18n/locales.ts            # UI 文案
│   ├── pages/                     # 页面组件
│   ├── routes/                    # 路由
│   ├── stores/                    # zustand stores（主题 + 语言）
│   ├── styles/                    # 全局 + markdown 样式
│   ├── theme/                     # 浅色 / 深色主题
│   ├── types/                     # 类型
│   └── utils/                     # frontmatter / posts / format
├── docs/DESIGN.md                 # 详细设计文档
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 技术栈

| 类别 | 选型 |
|---|---|
| 构建 | Vite 7 |
| 框架 | React 19 + TypeScript |
| 路由 | react-router-dom 6（BrowserRouter） |
| UI 基础 | Ant Design 6（仅做主题 token + 图标） |
| 状态 | zustand |
| Markdown | react-markdown + remark-gfm + rehype-highlight + rehype-slug + rehype-autolink-headings + rehype-sanitize |
| 搜索 | fuse.js（客户端） |
| SEO | 轻量级客户端 SEO 组件 + 构建期 sitemap / RSS |
| 质量 | ESLint + Prettier + Vitest |

详细架构与决策记录见 [docs/DESIGN.md](docs/DESIGN.md)。

---

## 常用脚本

| 命令 | 作用 |
|---|---|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建（含 RSS / sitemap） |
| `npm run preview` | 本地预览 dist/ |
| `npm run lint` | ESLint 检查 |
| `npm run format` | Prettier 格式化 |
| `npm run test` | 运行单测 |

---

## License

MIT.
