export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const CHANNEL_TALK_TOKEN = process.env.NEXT_PUBLIC_CHANNEL_TALK_TOKEN;
/**
 * API 엔드포인트를 정의합니다.
 */
export const END_POINT = {
  RECRUITMENT: `/v1/recruitments`,
  RECRUITMENT_DETAIL: (recruitmentId: number) =>
    `/v1/recruitments/${recruitmentId}`,
  RECENT_RECRUITMENT: '/v1/recruitments/recent-week',
  APPLICATIONS: `/v1/applications`,
  APPLY_PASSED: (recruitmentId: number, studentId: string) =>
    `/v1/applications/${recruitmentId}/${studentId}`,
  EXECUTIVE: `/v1/executive`,
  OPEN: `/v1/recruitments/open`,
} as const;
