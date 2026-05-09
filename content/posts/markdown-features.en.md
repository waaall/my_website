---
title: Markdown Features
date: 2026-04-21
tags: [frontend, markdown]
summary: A quick tour of the markdown features this blog supports.
---

## Headings and TOC

H2 and H3 headings are auto-collected into the sidebar TOC and get permalink anchors.

### Subheading example

Regular prose lives between headings.

## Lists

- Unordered list
- Supports nesting
  - Second level
  - Second level
1. Ordered list
2. Second item

## Code highlighting

```python
def fibonacci(n: int) -> list[int]:
    a, b = 0, 1
    out = []
    for _ in range(n):
        out.append(a)
        a, b = b, a + b
    return out
```

```bash
# Install dependencies
npm install
npm run dev
```

## Tables

| Feature        | Library             | Notes              |
| -------------- | ------------------- | ------------------ |
| Parser         | react-markdown      | AST-based          |
| GFM            | remark-gfm          | Tables, strike     |
| Highlight      | rehype-highlight    | Backed by hljs     |
| Heading anchor | rehype-slug         | Auto-generated ids |

## Quote

> One of the most important things in programming is knowing when to stop abstracting.

## Math (placeholder)

LaTeX can be added via `rehype-katex` later. Disabled by default to keep the bundle small.
