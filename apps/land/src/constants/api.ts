export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * API 엔드포인트를 정의합니다.
 */
export const END_POINT = {
  RECRUITMENT: `/v1/recruitments`,
  RECRUITMENT_DETAIL: (recruitmentId: number) =>
    `/v1/recruitments/${recruitmentId}`,
} as const;
