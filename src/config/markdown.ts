// Markdown 渲染配置：标题 id 加固定前缀，避免和浏览器全局属性产生 DOM clobbering 冲突
export const markdownConfig = {
  headingIdPrefix: 'section-',
} as const;
