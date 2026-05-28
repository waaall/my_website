# my_website

English | [中文](README_ZH.md)

Personal blog · Astro + TypeScript static site, hosted on Cloudflare Workers / Pages.

Bilingual posts (Chinese / English), Markdown + math formulas, dark mode, Pagefind full-text search, RSS, archive, and tag cloud.
Typography inspired by Substack / Vercel Blog: a single narrow column, serif headings, and a restrained palette.

---

## Quick start

```bash
# Install dependencies
npm install

# Local development (defaults to http://localhost:4321)
npm run dev

# Production build (output in dist/, includes pagefind / rss.xml / sitemap-index.xml)
npm run build

# Preview the production build locally
npm run preview
```

---

## Writing posts

Posts are Markdown files with frontmatter, placed in `content/posts/`.

File names **must** follow `<slug>.<lang>.md`; a shared slug denotes the two language versions of one post:

```txt
content/posts/
├── hello-world.zh.md
├── hello-world.en.md
├── markdown-features.zh.md
└── markdown-features.en.md
```

Frontmatter fields:

```yaml
---
title: Post title # required
date: 2026-05-09 # ISO date, required
tags: [frontend, tools] # optional
summary: One-line summary # optional, used in lists / RSS / search excerpts
cover: /images/x.jpg # optional, cover-image extension field
draft: false # optional, true hides the post from lists and RSS
---
```

When only one language is written, visiting the other language shows a "missing" notice and offers to switch to the version that exists.

The About page content comes from `content/pages/about.zh.md` and `content/pages/about.en.md`, also via Astro Content Collections.

---

## Site configuration

All site-level (project-specific) parameters are centralized in [`src/config/site.ts`](src/config/site.ts):

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

Route URLs are generated centrally in [`src/lib/routes.ts`](src/lib/routes.ts); UI strings live in [`src/i18n/locales.ts`](src/i18n/locales.ts).

---

## Deploy to Cloudflare Pages / Workers

The project builds statically at the root path `/` and does not rely on an SPA fallback.

### Recommended Cloudflare Pages settings

| Setting                | Value           |
| ---------------------- | --------------- |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Deploy command         | Leave empty     |

The build generates `dist/_redirects`, redirecting `/` to the default-language path (currently `/zh`).

### Cloudflare Workers static-assets deployment

The repo includes [`wrangler.jsonc`](wrangler.jsonc); Workers Assets uses:

| Setting                | Value                 |
| ---------------------- | --------------------- |
| Build command          | `npm run build`       |
| Build output directory | `dist`                |
| Deploy command         | `npx wrangler deploy` |

`not_found_handling` is set to `404-page`, so unknown routes return the Astro-generated `404.html`.

---

## Directory structure

See the full directory tree and naming conventions in [docs/DESIGN.md](docs/DESIGN.md), section 5 "Directory & naming conventions".

---

## Tech stack

| Category            | Choice                                                  |
| ------------------- | ------------------------------------------------------- |
| Build / SSG         | Astro 5                                                 |
| Interactivity       | Vanilla TypeScript (no React / Preact runtime)          |
| Content             | Astro Content Collections + Markdown                    |
| Markdown extensions | remark-gfm + remark-math + rehype-katex + Shiki         |
| Search              | Pagefind (static index built at build time, per-language filter) |
| Theme               | CSS variables + localStorage + anti-FOUC inline script  |
| RSS / sitemap       | `@astrojs/rss` + `@astrojs/sitemap`                     |
| Quality             | ESLint + Prettier + Vitest + Playwright + `astro check` |

For detailed architecture and decision records, see [docs/DESIGN.md](docs/DESIGN.md). For the migration history, see [docs/plans/astro-migration.md](docs/plans/astro-migration.md).

---

## Common scripts

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Astro dev server               |
| `npm run build`        | Production build and generate Pagefind index |
| `npm run preview`      | Preview dist/ locally                    |
| `npm run lint`         | Run ESLint                               |
| `npm run format:check` | Check formatting with Prettier           |
| `npm run test:run`     | Run Vitest unit tests                    |
| `npm run test:e2e`     | Run Playwright e2e tests                 |

---

## License

MIT.
