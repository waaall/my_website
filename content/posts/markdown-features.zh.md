---
title: Markdown 渲染能力一览
date: 2026-04-21
tags: [前端, Markdown]
summary: 站点支持的 Markdown 语法、代码高亮、表格与目录生成。
---

## 标题与目录

H2、H3 会被自动收集进侧栏目录，并支持锚点直链。

### 子标题示例

正文中可以使用各种排版元素。

## 列表

- 无序列表
- 支持嵌套
  - 第二层
  - 第二层
1. 有序列表
2. 第二项

## 代码与高亮

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
# 安装依赖
npm install
npm run dev
```

## 表格

| 功能       | 库                  | 备注           |
| ---------- | ------------------- | -------------- |
| 解析       | react-markdown      | AST 渲染       |
| GFM 支持   | remark-gfm          | 表格、删除线等 |
| 高亮       | rehype-highlight    | highlight.js   |
| 标题锚点   | rehype-slug         | id 自动生成    |

## 引用

> 编程最重要的事情之一是知道何时停止抽象。

## 数学（占位）

如果之后需要 LaTeX，可以接入 `rehype-katex`，本站默认未开启。
