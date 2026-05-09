# 设计文档

> 本文档记录站点的 Astro 静态架构、关键决策与扩展方向。读者预期是未来的我自己。

---

## 1. 目标与边界

### 目标

- **写作零摩擦**：用 Markdown 在仓库里写，git 推送即发布。
- **加载快**：默认静态 HTML，文章页不依赖 React runtime 才能阅读。
- **离线友好**：纯静态、无运行时后端服务；评论 / 邮件订阅默认不做。
- **可阅读**：Substack / Vercel Blog 风格的窄栏排版，长文为主。
- **双语**：中英两种语言显式 URL 段，文章版本互相独立。
- **可演进**：站点配置、路由、内容查询、RSS 等逻辑集中在源码里，避免散落硬编码。

### 不做（Non-goals）

- ❌ 后台 / 编辑器界面（直接改 markdown 文件）。
- ❌ 评论系统 / 邮件订阅。
- ❌ 兼容旧 HashRouter 链接（`/#/zh/...` 直接走 404）。
- ❌ 在 Markdown 正文图片上做自动优化（Astro 当前对外部 content 目录有限制）。

---

## 2. 架构总览

```txt
┌──────────────────────────────────────────────────────┐
│                  GitHub Repo (main)                  │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────┐   │
│  │ src/ (Astro) │  │ content/  │  │ tests/       │   │
│  │ pages/lib/ui │  │ *.md      │  │ unit/e2e     │   │
│  └──────────────┘  └───────────┘  └──────────────┘   │
└──────────────────────────────────────────────────────┘
        │ push / deploy
        ▼
┌──────────────────────────────────────────────────────┐
│  Build:                                              │
│    astro build → pagefind --site dist                │
│    → rss.xml / rss.en.xml / sitemap-index.xml        │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  Cloudflare Workers / Pages CDN                      │
│    static HTML + assets + Pagefind index             │
│    unknown routes → 404.html                         │
└──────────────────────────────────────────────────────┘
```

内容通过 Astro Content Collections 读取根目录 `content/`，页面通过 `src/pages/` 文件路由静态生成。交互只在搜索、主题切换、语言切换、TOC 等局部使用原生 TypeScript。

---

## 3. 关键决策与权衡

### 3.1 选择 Astro 静态站点

| 选项             | 利                                                                     | 弊                                    | 决策 |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------- | ---- |
| Astro            | 默认少 JS；Markdown / RSS / sitemap 管线成熟；文件路由直接生成静态 URL | 需要迁移 React 组件                   | ✅   |
| Vite + React SPA | 旧实现熟悉                                                             | 首屏依赖 JS；SEO / 404 / RSS 需要自建 | ❌   |
| Next.js 静态导出 | 生态大                                                                 | 对个人长文博客偏重                    | ❌   |

当前原则是重构彻底：不保留无必要的 React、Antd、zustand、Fuse、旧 HashRouter 兼容层。

### 3.2 路由：显式语言段 + Astro 文件路由

所有可访问内容都有语言段：

```txt
/zh
/en/posts/hello-world
/zh/tags/markdown
```

路由拼接集中在 [`src/lib/routes.ts`](../src/lib/routes.ts)。根路径 `/` 由构建时生成的 `_redirects` 指向默认语言（当前 `/zh`），本地静态兜底页也会重定向。

### 3.3 内容层：Content Collections

文章文件约定为 `<slug>.<lang>.md`。`src/content.config.ts` 用 `glob()` loader 指向：

```txt
content/posts/**/*.md
content/pages/**/*.md
```

`src/lib/posts.ts` 把 `CollectionEntry<'posts'>` 映射为业务层 `Post`，并提供：

- `getAllPosts()` / `getPostsByLang()`
- `getPost()` / `getPostOtherLang()`
- `getNeighbors()`
- `getTagCounts()`
- `getArchive()`

纯函数放在 `src/lib/post-helpers.ts`，方便 Vitest 单测。

### 3.4 双语策略

每篇文章两种语言是两个独立 Markdown 文件，slug 绑定同一主题。若当前语言缺失但另一语言存在，详情页渲染缺失提示，而不是复用另一语言正文伪装当前语言。

UI 文案集中在 [`src/i18n/locales.ts`](../src/i18n/locales.ts)，语言列表、默认语言与展示名集中在 [`src/config/site.ts`](../src/config/site.ts)。

### 3.5 主题：CSS 变量 + 防 FOUC

颜色、间距、字体等 token 放在 [`src/styles/tokens.css`](../src/styles/tokens.css)。主题切换逻辑为：

1. `BaseLayout.astro` 在 `<head>` 内注入同步脚本，读取 localStorage，避免首屏闪烁。
2. `ThemeSwitch.astro` 原生 TS 在 `auto → light → dark → auto` 间循环。
3. 未显式设置主题时用 `prefers-color-scheme` 跟随系统。

### 3.6 Markdown 渲染

Astro Markdown 管线配置：

- `remark-gfm`：表格、任务列表等。
- `remark-math` + `rehype-katex`：数学公式。
- Shiki 双主题：浅色 / 深色代码高亮随 `data-theme` 切换。

KaTeX CSS 只在检测到公式的文章页加载，避免列表页和普通文章引入额外样式。

### 3.7 搜索：Pagefind

`npm run build` 先执行 `astro build`，再执行 `pagefind --site dist`。只有带 `data-pagefind-body` 的页面进入索引；文章页和 About 页按 `lang` 写入 Pagefind filter，搜索框按当前 `<html lang>` 过滤，避免中英串台。

### 3.8 RSS / sitemap / 404

- RSS：`src/pages/rss.xml.ts` 生成默认语言，`src/pages/rss.[lang].xml.ts` 生成非默认语言。
- sitemap：`@astrojs/sitemap` 基于静态路由生成。
- robots：`src/pages/robots.txt.ts` 从 `siteConfig.url` 派生 sitemap 地址。
- 404：Cloudflare Workers Assets 使用 `not_found_handling: "404-page"`。

---

## 4. 数据流

### 文章渲染路径

```txt
content/posts/x.zh.md
    │
    ▼ build time
Astro Content Collections
    │
    ▼ src/lib/posts.ts
CollectionEntry → Post 业务模型
    │
    ▼ src/pages/[lang]/posts/[slug].astro
render(entry) → Content / headings
    │
    ▼ src/layouts/PostLayout.astro
BaseLayout + article + PostToc
    │
    ▼ HTML + 少量交互脚本
```

### 搜索索引路径

```txt
article[data-pagefind-body]
    │
    ▼ pagefind --site dist
/pagefind/* 静态索引
    │
    ▼ SearchBox.astro 动态 import('/pagefind/pagefind.js')
按 lang filter 搜索当前语言内容
```

---

## 5. 目录与命名规范

- **配置集中**：站点名、域名、语言、分页数在 `src/config/site.ts`。
- **路由集中**：URL 结构只从 `src/lib/routes.ts` 生成。
- **样式分层**：token 在 `tokens.css`，全局 reset 在 `global.css`，文章排版在 `markdown.css`。
- **组件扁平**：Astro 组件放在 `src/components/`，页面级骨架放在 `src/layouts/`。
- **纯逻辑可测**：与 Astro runtime 解耦的函数放在 `src/lib/` 并写 Vitest。

---

## 6. 关键文件索引

| 文件                                                                  | 作用                                     |
| --------------------------------------------------------------------- | ---------------------------------------- |
| [`src/content.config.ts`](../src/content.config.ts)                   | Content Collections loader 与 schema     |
| [`src/config/site.ts`](../src/config/site.ts)                         | 站点级配置                               |
| [`src/lib/posts.ts`](../src/lib/posts.ts)                             | 内容查询入口                             |
| [`src/lib/post-helpers.ts`](../src/lib/post-helpers.ts)               | 内容相关纯函数                           |
| [`src/lib/routes.ts`](../src/lib/routes.ts)                           | URL 生成与语言前缀处理                   |
| [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro)     | HTML/head/header/footer/theme init       |
| [`src/layouts/PostLayout.astro`](../src/layouts/PostLayout.astro)     | 文章详情骨架 + TOC 容器                  |
| [`src/components/SearchBox.astro`](../src/components/SearchBox.astro) | Pagefind 搜索弹窗                        |
| [`src/components/PostToc.astro`](../src/components/PostToc.astro)     | 桌面 sticky / 窄屏滑入目录               |
| [`astro.config.mjs`](../astro.config.mjs)                             | Astro、Markdown、sitemap、redirects 配置 |
| [`wrangler.jsonc`](../wrangler.jsonc)                                 | Cloudflare Workers 静态资源配置          |

---

## 7. 扩展点（按优先级）

1. **封面图优化**：为 frontmatter `cover` 接入 Astro `<Image />`。
2. **OG 图自动生成**：构建期用 satori / resvg 生成社交卡片。
3. **多作者**：`siteConfig.authors[]` + frontmatter `author` 字段。
4. **草稿预览**：开发环境下用 query 或环境变量显示 draft。
5. **更丰富搜索 UI**：展示标签、日期和子结果跳转。

---

## 8. 已知限制

- **Markdown 正文图片不自动优化**：只对 layout / cover 层面做优化扩展。
- **Pagefind 仅生产构建可用**：`npm run dev` 下搜索弹窗会提示索引未生成。
- **语言类型目前是 `zh | en`**：新增语言需要扩展 `Lang` 类型、`siteConfig` 与 UI 文案。
- **TOC 断点由组件 CSS / TS 共同约定为 1024px**：如要改断点，需要同步调整。
