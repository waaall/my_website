// 搜索配置：集中维护候选数量、展示数量、防抖时间与 Pagefind 排名权重
export const searchConfig = {
  debounceMs: 180,
  candidateLimit: 20,
  resultLimit: 10,
  ranking: {
    metaWeights: {
      title: 8,
      summary: 2,
    },
  },
} as const;
