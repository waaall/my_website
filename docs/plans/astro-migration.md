# Astro 重构迁移计划

> 状态：执行中（P1-P8 已完成，P9 部署确认中）
> 起草日期：2026-05-09
> 目标：把现有 Vite + React 19 SPA 重构为 Astro 静态站点，保留全部现有功能与 URL 结构，不刻意做向后兼容（旧 HashRouter 链接、旧客户端搜索方案、旧主题/状态库等可直接丢弃）。

---

## 1. 决策记录

迁移开工前与作者对齐的关键决策：

| #   | 议题                           | 决定                                                                                          |
| --- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| 1   | URL 形态                       | **保留** `/:lang/...` 前缀（中英两种语言均显式语言段）                                        |
| 2   | 交互 island 框架               | **完全 Astro + 纯 TS**，不引入 React/Preact 运行时                                            |
| 3   | 搜索方案                       | 改用 **Pagefind**（构建期生成静态索引，支持正文全文）。丢弃 Fuse.js                           |
| 4   | UI 库                          | **完全移除 Antd 与 Antd 图标**。颜色 token → CSS 变量；图标改为内联 SVG                       |
| 5   | 代码高亮                       | 用 Astro 内置 **Shiki**。丢弃 rehype-highlight                                                |
| 6   | 重构方式                       | **同仓库就地重构**，删除 `src/`，新建 Astro 工程；`content/` 原地不动                         |
| 7   | 测试                           | **保留 Vitest** 覆盖工具函数；**新增 Playwright** 做关键路径 e2e                              |
| 8   | About 页                       | 走 **Content Collections**，统一管线                                                          |
| 9   | 站点配置                       | `src/config/site.ts` **原样保留**（仅迁移路径）                                               |
| 10  | 顺带新增                       | 数学公式（remark-math + rehype-katex）；封面图用 `<Image />`；评论 / 邮件订阅不做             |
| 11  | 旧 `/#/zh/...` HashRouter 链接 | **不保留**，直接走 404                                                                        |
| 12  | `content/` 位置                | 原地不动（项目根 `content/`，由 Astro `glob()` loader 指向）                                  |
| 13  | `/` 行为                       | 重定向到 `/${defaultLang}`（构建时按 `siteConfig.defaultLang` 生成 `_redirects`，避免硬编码） |
| 14  | RSS 命名                       | 保持现状：`rss.xml`（默认中文）+ `rss.en.xml`                                                 |
| 15  | Markdown 图片                  | `.md` 内 `![]()` **不做自动优化**（Astro 当前限制）；仅 layout / 封面用 `<Image />`           |

## 2. TOC 行为规约

| 项                     | 规定                                                                    |
| ---------------------- | ----------------------------------------------------------------------- |
| 桌面/窄屏断点          | `< 1024px` 切悬浮模式                                                   |
| 桌面位置               | 文章右侧栏，`position: sticky; top: 5rem`（**不会因为正文滚动而消失**） |
| 悬浮按钮位置           | 右下角，16px 边距                                                       |
| 展开形式               | 右侧滑入面板（最大宽 320px）+ 半透明遮罩                                |
| 关闭：点 TOC 项        | 跳转后自动关闭                                                          |
| 关闭：点遮罩或文章正文 | 关闭                                                                    |
| 关闭：ESC              | 关闭                                                                    |
| 章节高亮               | IntersectionObserver 监听当前可见标题，TOC 中加粗 + 左色条              |
| 锚点滚动               | `scroll-behavior: smooth` + `scroll-margin-top` 偏移避开 header         |

## 3. 技术栈与依赖

**新增 / 保留**

| 包                                                                      | 用途                          |
| ----------------------------------------------------------------------- | ----------------------------- |
| `astro`                                                                 | 框架本体                      |
| `@astrojs/sitemap`                                                      | sitemap 生成                  |
| `@astrojs/rss`                                                          | RSS 生成                      |
| `remark-gfm`                                                            | GFM（表格、删除线、任务列表） |
| `remark-math` + `rehype-katex` + `katex`                                | 数学公式                      |
| `github-slugger`                                                        | 章节锚点 slug（保留）         |
| `dayjs`                                                                 | 日期格式化（保留）            |
| `sharp`                                                                 | Astro `<Image />` 后端        |
| `pagefind`                                                              | 客户端搜索（构建期生成索引）  |
| `vitest`                                                                | 单测（保留）                  |
| `@playwright/test`                                                      | e2e（新增）                   |
| `eslint` + `eslint-plugin-astro` + `prettier` + `prettier-plugin-astro` | 代码风格                      |
| `typescript`                                                            | 类型                          |

**移除**

`react`、`react-dom`、`react-router-dom`、`antd`、`@ant-design/icons`、`react-markdown`、`rehype-highlight`、`rehype-sanitize`、`rehype-slug`、`rehype-autolink-headings`（Astro 内置/Shiki 处理）、`fuse.js`、`zustand`、`vite`（Astro 自带）、`tsx`（gen-feed 不再需要）、`@vitejs/plugin-react`、`@testing-library/*`、`jsdom`、`highlight.js`。

## 4. 新目录结构

```
my_website/
├── content/                       # 原地不动
│   ├── posts/  (*.zh.md / *.en.md)
│   └── pages/  (about.zh.md / about.en.md)
├── public/
│   ├── favicon.svg
│   └── ...                        # 仅放静态资源；_redirects / robots.txt 由构建生成
├── src/
│   ├── content.config.ts          # 集合定义 + zod schema
│   ├── lib/
│   │   ├── posts.ts               # 取代 utils/posts.ts
│   │   ├── format.ts              # 复用现有
│   │   └── routes.ts              # 复用现有 (去掉 legacy hash 逻辑)
│   ├── config/site.ts             # 原样保留
│   ├── i18n/locales.ts            # 原样保留
│   ├── styles/
│   │   ├── global.css             # 迁移现有 CSS 变量 (light/dark)
│   │   └── markdown.css
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeSwitch.astro      # 内联 TS, 无框架
│   │   ├── LangSwitch.astro
│   │   ├── SearchBox.astro        # 内联 TS + Pagefind JS API
│   │   ├── PostCard.astro
│   │   ├── PostMeta.astro
│   │   ├── PostPager.astro
│   │   ├── PostToc.astro          # 含桌面 sticky + 窄屏 fab 行为
│   │   └── Pagination.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro       # html/head/header/footer + theme init script
│   │   └── PostLayout.astro       # BaseLayout + TOC 容器 + article wrapper
│   └── pages/
│       ├── index.astro            # 重定向兜底（主要靠 _redirects）
│       ├── 404.astro
│       ├── rss.xml.ts             # 默认中文
│       ├── rss.en.xml.ts
│       └── [lang]/
│           ├── index.astro        # 首页（最近文章）
│           ├── about.astro
│           ├── archive.astro
│           ├── posts/
│           │   ├── [...page].astro    # 分页列表
│           │   └── [slug].astro       # 详情
│           └── tags/
│               ├── index.astro        # 标签云
│               └── [tag]/[...page].astro
├── tests/
│   ├── unit/                      # vitest（保留 frontmatter / posts 工具）
│   └── e2e/                       # playwright
├── astro.config.mjs               # site, integrations, markdown 配置
├── tsconfig.json                  # Astro 推荐预设
├── package.json
├── wrangler.jsonc                 # not_found_handling 改为 "404-page"
├── playwright.config.ts
├── vitest.config.ts
└── README.md / docs/DESIGN.md     # 迁移完成后更新
```

## 5. 文件级映射

| 旧                                                                          | 新 / 状态                                                                               |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/App.tsx` / `App.css` / `main.tsx` / `index.html`                       | 删除（Astro 自动生成 HTML）                                                             |
| `src/routes/index.tsx`                                                      | 删除（用 Astro 文件路由）                                                               |
| `src/utils/posts.ts`                                                        | → `src/lib/posts.ts`（重写为 Astro Content Collections API）                            |
| `src/utils/frontmatter.ts` + 测试                                           | 删除（Astro 内置 YAML frontmatter）                                                     |
| `src/utils/format.ts` / `routes.ts`                                         | → `src/lib/`（routes.ts 去掉 `getLegacyHashPath`）                                      |
| `src/config/site.ts` / `i18n/locales.ts` / `types/post.ts`                  | 保留，路径调整                                                                          |
| `src/stores/themeStore.ts` / `langStore.ts`                                 | 删除（改用 localStorage + inline script）                                               |
| `src/theme/lightTheme.ts` / `darkTheme.ts`                                  | 删除（Antd token 不再需要）                                                             |
| `src/components/Layout/*.tsx`、`Common/*.tsx`、`Post/*.tsx`                 | 全部重写为 `.astro`                                                                     |
| `src/pages/*.tsx` (Home/PostList/PostDetail/TagPage/Archive/About/NotFound) | 全部重写为 Astro 页面                                                                   |
| `src/hooks/*.ts`                                                            | 删除（Astro 不需要 hooks；TOC active 改 vanilla IntersectionObserver；搜索改 Pagefind） |
| `scripts/gen-feed.ts`                                                       | 删除（用 `@astrojs/rss` + `@astrojs/sitemap`）                                          |
| `vite.config.ts` / `tsconfig.node.json`                                     | 删除                                                                                    |
| `eslint.config.js`                                                          | 重写（Astro 预设）                                                                      |
| `wrangler.jsonc`                                                            | 修改：`not_found_handling: "404-page"`                                                  |
| `.github/workflows/deploy.yml`                                              | 检查（构建命令可能不变）                                                                |

## 6. 阶段拆分

| 阶段                                | 状态 | 目标                                                                                                                        | 验收                                            |
| ----------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **P1 清理 & 脚手架**                | ✅   | 删旧代码、`npm create astro`、装依赖、跑 hello world                                                                        | `npm run dev` 出 Astro 默认页                   |
| **P2 内容层**                       | ✅   | `content.config.ts` + `lib/posts.ts`，从 `content/` 加载并按 `.zh./.en.` 切语言                                             | vitest 单测覆盖核心纯函数                       |
| **P3 布局 & 主题**                  | ✅   | `BaseLayout` + 全局 CSS 变量 + 防 FOUC inline script + Header/Footer/ThemeSwitch/LangSwitch                                 | 中英切换、明暗切换、刷新不闪                    |
| **P4 列表页**                       | ✅   | 首页 / 分页文章列表 / 标签云 / 标签详情 / 归档                                                                              | 静态构建产物路径正确，分页走 Astro `paginate()` |
| **P5 文章详情 & TOC**               | ✅   | `PostLayout` + `[slug].astro` + `PostToc.astro`（桌面 sticky + 窄屏 fab）+ 上下篇 + Shiki + KaTeX + 章节锚点 + 缺失语言提示 | TOC 行为符合规约，明暗主题代码块同步            |
| **P6 搜索 (Pagefind)**              | ✅   | `SearchBox` 组件 + `astro build && pagefind` 双步构建 + 按 `lang` 过滤                                                      | 中英两边搜索互不串台                            |
| **P7 RSS / sitemap / 404 / robots** | ✅   | `rss.xml.ts` + `rss.[lang].xml.ts` + `@astrojs/sitemap` + `404.astro` + `_redirects`                                        | RSS 校验通过，`/` → `/zh`，未知路径渲染 404     |
| **P8 测试**                         | ✅   | vitest 单测 + Playwright e2e（首页 / 文章 / 语言切换 / 主题切换 / TOC 桌面 & 窄屏 / 搜索）                                  | 本地质量门禁全绿                                |
| **P9 部署 & 文档**                  | 🚧   | `wrangler.jsonc` 改 SPA→静态、CI 验证、更新 README + DESIGN.md                                                              | CF 部署成功，文档与代码一致                     |

## 7. 已知风险 / 注意事项

- **`content/` 在 `src/` 外**：Astro 5 的 `glob()` loader 支持从项目根解析，`content.config.ts` 里使用 `glob({ pattern: '**/*.md', base: './content/posts' })`。
- **Shiki 双主题**：用 `themes: { light, dark }` 模式，配合 CSS 变量切换暗色，避免重复渲染。
- **Pagefind 多语言**：用 `<html lang="zh">` 让 Pagefind 自动识别，UI 上加 `data-pagefind-filter="lang"` 做按语言过滤。
- **KaTeX CSS**：仅在含数学公式的文章页引 `katex.min.css`（~25KB），首页/列表页不引。
- **`_redirects` 文件**：内容 `/  /zh  301`，CF Pages/Workers 原生支持。
- **Astro 5 内容集合 API**：`getCollection` 取代旧的 `Astro.glob`，需注意写法。

## 8. 执行规则

- 每完成一个阶段，更新本文件"阶段拆分"表对应行的状态（✅ / 🚧 / ⏳）。
- 重大偏离计划的决策（例如发现某依赖不可用、需新增阶段）须先在本文件追加"决策追加"小节再执行。
- 所有代码注释使用简洁中文（遵循全局规则）。
