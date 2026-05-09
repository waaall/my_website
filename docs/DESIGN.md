# 设计文档

> 本文档记录站点的架构、关键决策与扩展方向。读者预期是未来的我自己。

---

## 1. 目标与边界

### 目标

- **写作零摩擦**：用 Markdown 在仓库里写，git 推送即发布
- **加载快**：首屏 < 200KB gzip，文章页冷启动可即时阅读
- **离线友好**：纯静态、无运行时依赖外部服务（评论也不要）
- **可阅读**：Substack / Vercel Blog 风格的窄栏排版，长文为主
- **双语**：中英两种语言的同一篇文章相互独立，存在则展示
- **可演进**：避免锁死的"博客框架"魔法，所有逻辑都在源码里

### 不做（Non-goals）

- ❌ 后台 / 编辑器界面（直接改 markdown 文件）
- ❌ 评论系统（默认无）
- ❌ 服务端渲染 / SSG 框架（不引入 Next.js / Astro，避免大型工具锁定）
- ❌ 图床 / 媒体管理（用 `public/images/` 即可）

---

## 2. 架构总览

```
┌──────────────────────────────────────────────────────┐
│                  GitHub Repo (main)                  │
│  ┌────────────┐  ┌───────────┐  ┌────────────────┐   │
│  │ src/ (TS)  │  │ content/  │  │ workflows/     │   │
│  │ React app  │  │ *.md      │  │ deploy.yml     │   │
│  └────────────┘  └───────────┘  └────────────────┘   │
└──────────────────────────────────────────────────────┘
        │ push to main
        ▼
┌──────────────────────────────────────────────────────┐
│  GitHub Actions:                                     │
│    npm ci → vite build → tsx scripts/gen-feed.ts     │
│    → upload-pages-artifact → deploy-pages            │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  GitHub Pages CDN                                    │
│    /index.html  +  /assets/*  +  rss.xml / sitemap   │
└──────────────────────────────────────────────────────┘
        │
        ▼
   浏览器：HashRouter SPA，文章正文已在 bundle 中
```

构建期 Vite 通过 `import.meta.glob('/content/posts/*.md', { query: '?raw', eager: true })`
把所有 Markdown 内联到 bundle 里。运行时不再发起 IO，所有路由切换都是内存查询。

---

## 3. 关键决策与权衡

### 3.1 选择 Vite + React，而不是 Astro / Next.js

| 选项 | 利 | 弊 | 决策 |
|---|---|---|---|
| **Vite + React (本方案)** | 与 qa-agent-frontend 栈一致；逻辑全在源码里、零魔法；纯 SPA 简单 | 需要自己实现 RSS / sitemap | ✅ |
| Astro | 默认零 JS、性能极佳、内置 MD/MDX/RSS | 引入新工具栈、更多约定 | ❌ |
| Next.js (静态导出) | 生态大 | 框架太重，文章本质上不需要 SSR / RSC | ❌ |

文章总量少（个人博客典型规模 < 500 篇），SPA + 全量打包 markdown 已绰绰有余。

### 3.2 路由：HashRouter

GitHub Pages 没有可配置的 fallback 路由（项目仓库只有 `404.html` 这个 hack），用 `BrowserRouter` 需要：
1. 复制 `index.html` 为 `404.html`，
2. 写一段脚本在 `404.html` 里把路径塞进 sessionStorage 再跳回根。

`HashRouter` 把这些复杂度全省掉了，代价是 URL 里多一个 `#`，对个人博客可以接受。

### 3.3 Markdown 加载：`import.meta.glob` 编译期内联

```ts
const rawModules = import.meta.glob('/content/posts/*.md', {
  query: '?raw', import: 'default', eager: true,
});
```

- ✅ 零运行时 IO
- ✅ Tree-shaking 不友好但博客体量小（每 100 篇 markdown ≈ 200KB gzip）
- ❌ 大量文章后会膨胀首屏

未来若文章数 > 200，可改为：路由级 `lazy()` 拆 chunk + 把列表索引（仅 frontmatter）单独抽出。
当前不做。

### 3.4 frontmatter 解析：自实现 30 行

`gray-matter` 在浏览器需要 polyfill `Buffer`，引入 30KB 副作用。
我们的 frontmatter 只用 `string / number / boolean / string[]`，写一个最小解析器（[`src/utils/frontmatter.ts`](../src/utils/frontmatter.ts)）足以覆盖。

### 3.5 双语策略：文件名绑定，URL 显式语言段

每篇文章是两个独立文件 `<slug>.zh.md` / `<slug>.en.md`，slug 串起两种语言版本。
URL 包含语言段 `/#/zh/posts/hello`，切换语言时直接替换该段。

为什么不用 i18n 库（react-intl / i18next）？
- 我们要翻译的"内容"全是 markdown 整篇，不是分散字符串
- UI 文案只有几十条，不值得 200KB i18n 运行时
- → 自己写一个 [`src/i18n/locales.ts`](../src/i18n/locales.ts) + [`useI18n`](../src/hooks/useI18n.ts) hook 即可

缺失语言版本的处理：详情页检测到当前语言无文章但另一语言有，会展示提示并允许一键切换。

### 3.6 主题：CSS 变量 + Ant Design token 双轨

Ant Design token 给 antd 组件用，CSS 变量给所有原生 HTML 用。两套同步切换：
切换主题时，[`App.tsx`](../src/App.tsx) 把对应的 CSS 变量写到 `:root`，并设置 `data-theme` 属性给样式选择器使用。

参考自 qa-agent-frontend 的实践，但简化掉了过渡动画和 meta theme-color 同步逻辑。

### 3.7 搜索：客户端 Fuse.js

在文章数 < 1000 量级，全量索引（标题 + 标签 + 摘要）<50KB，Fuse.js 模糊匹配 < 5ms。
不写后端、不接搜索服务，简单可靠。

不索引正文：
- 索引体积会爆炸
- 搜索结果跳到正文中段不如跳到摘要直观
- 正文搜索更适合 Algolia / Pagefind，这是后续可以接的扩展点

### 3.8 RSS / sitemap：构建后脚本

`scripts/gen-feed.ts` 用 `tsx` 在 Node 端运行，独立读 `content/posts/`，写 `dist/rss.xml`、`dist/rss.<other>.xml`、`dist/sitemap.xml`。

为什么不写成 Vite 插件？纯 Node 脚本最简单、完全独立、好测试。

注意：**HashRouter 下 sitemap 对 SEO 帮助有限**，因为搜索引擎一般不索引 hash 后的路径。
若 SEO 重要，需切换到 BrowserRouter 并补 404 fallback——目前不是优先级。

---

## 4. 数据流

### 文章渲染路径

```
content/posts/x.zh.md
    │
    ▼  build time
import.meta.glob('?raw') → Record<path, string>
    │
    ▼  src/utils/posts.ts
parseFilename + parseFrontmatter → Post[]
    │
    ▼  React hook
usePostList(lang) / useSinglePost(slug, lang) / ...
    │
    ▼  page component
PostList / PostDetail
    │
    ▼  for detail page
MarkdownRenderer
  → react-markdown
  → remark-gfm + rehype-slug + rehype-autolink-headings
  → rehype-highlight + rehype-sanitize
  → DOM
```

### 状态

只有两个全局 store：

| Store | 字段 | 持久化 |
|---|---|---|
| `themeStore` | `mode: 'light' \| 'dark' \| 'auto'`, `currentTheme` | localStorage |
| `langStore` | `lang: 'zh' \| 'en'` | localStorage（首次根据浏览器） |

文章数据不进 store——它是从源码 import 的常量，全程纯函数访问。

URL 的 `:lang` 段在 [`routes/index.tsx`](../src/routes/index.tsx) 的 `LangSync` 组件里同步到 store。

---

## 5. 目录与命名规范

- **组件目录**：每个目录配 `index.ts` 做 barrel 导出
- **样式**：组件级用 inline style（站点小、组件少、无 BEM 复杂度），全局/markdown 用 `src/styles/*.css`
- **类型**：`src/types/` 集中放跨模块共享类型；只一个组件用的类型放组件文件里
- **无神奇魔法**：避免 `any`，避免运行时反射，避免大量 HOC

---

## 6. 关键文件索引

| 文件 | 作用 |
|---|---|
| [`src/utils/posts.ts`](../src/utils/posts.ts) | Markdown 加载、解析、查询入口（最核心） |
| [`src/utils/frontmatter.ts`](../src/utils/frontmatter.ts) | 自实现 frontmatter 解析器 |
| [`src/config/site.ts`](../src/config/site.ts) | 所有站点级配置 |
| [`src/i18n/locales.ts`](../src/i18n/locales.ts) | UI 文案翻译 |
| [`src/routes/index.tsx`](../src/routes/index.tsx) | 路由树 |
| [`src/components/Post/MarkdownRenderer.tsx`](../src/components/Post/MarkdownRenderer.tsx) | Markdown → React 渲染管线 |
| [`src/theme/`](../src/theme) | 浅色 / 深色主题与 CSS 变量 |
| [`scripts/gen-feed.ts`](../scripts/gen-feed.ts) | RSS / sitemap 生成 |
| [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) | CI 构建 + 部署 |
| [`vite.config.ts`](../vite.config.ts) | base 路径、chunk 切分、alias |

---

## 7. 扩展点（按优先级）

1. **图片优化**：接入 `vite-imagetools` 自动多尺寸 + AVIF
2. **数学公式**：在 `MarkdownRenderer` 加 `rehype-katex`
3. **正文搜索**：用 [Pagefind](https://pagefind.app/)（构建期生成静态索引，CDN 友好）
4. **草稿预览**：`?draft=1` query 显示 draft 文章
5. **多作者**：`siteConfig.authors[]` + frontmatter `author` 字段
6. **OG 图自动生成**：构建期用 satori / resvg 渲染社交卡片
7. **切换到 BrowserRouter**：补 `404.html` fallback，提升 SEO
8. **评论**：接 Giscus（基于 GitHub Discussions）

每一项都是局部修改，不会动到现有架构。

---

## 8. 已知限制

- **HashRouter 对 SEO 不友好**：搜索引擎可能不索引 `/#/zh/posts/x` 这类路径
- **首屏体积随文章数增长**：当前所有文章都内联进 bundle；超过 ~200 篇需要按路由分包
- **代码块语言全量加载**：`rehype-highlight` 默认引入所有语言，bundle ~150KB；可以收紧到常用 5-10 种
- **没有评论 / 邮件订阅**：需要的话各自接第三方服务
