/**
 * 모집 공고 관련 쿼리 키
 */
export const RECRUITMENT_QUERY_KEY = {
  ALL: ['Recruitment'],
  LIST: () => [...RECRUITMENT_QUERY_KEY.ALL, 'list'],
} as const;
