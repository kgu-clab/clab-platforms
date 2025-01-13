/**
 * 모집 공고 관련 쿼리 키
 */
export const RECRUITMENT_QUERY_KEY = {
  ALL: ['Recruitment'],
  LIST: () => [...RECRUITMENT_QUERY_KEY.ALL, 'list'],
  DETAILS: () => [...RECRUITMENT_QUERY_KEY.ALL, 'details'],
  DETAIL: (id: number) => [...RECRUITMENT_QUERY_KEY.DETAILS(), id],
  RECENT: () => [...RECRUITMENT_QUERY_KEY.ALL, 'recent'],
} as const;
