/**
 * 모집 공고 관련 쿼리 키
 */
export const RECRUITMENT_QUERY_KEY = {
  ALL: ['Recruitment'],
  LIST: () => [...RECRUITMENT_QUERY_KEY.ALL, 'list'],
  DETAILS: () => [...RECRUITMENT_QUERY_KEY.ALL, 'details'],
  DETAIL: (id: number) => [...RECRUITMENT_QUERY_KEY.DETAILS(), id],
  RECENT: () => [...RECRUITMENT_QUERY_KEY.ALL, 'recent'],
  NOW: () => [...RECRUITMENT_QUERY_KEY.ALL, 'now'],
} as const;

/**
 * 동아리 지원 관련 쿼리 키
 */
export const APPLICATION_QUERY_KEY = {
  ALL: ['Application'],
  APPLICATIONS: () => [...APPLICATION_QUERY_KEY.ALL, 'applications'],
  RESULT: () => [...APPLICATION_QUERY_KEY.ALL, 'result'],
} as const;

/**
 * 운영진 정보 조회 관련 쿼리 키
 */
export const EXECUTIVE_QUERY_KEY = {
  ALL: ['Executive'],
  LIST: () => [...EXECUTIVE_QUERY_KEY.ALL, 'list'],
} as const;
