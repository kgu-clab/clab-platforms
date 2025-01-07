import { API_BASE_URL, END_POINT } from '@/constants';

/**
 * 최신 모집 공고 5개 조회
 */
export async function getRecruitment() {
  const apiURL = `${API_BASE_URL}${END_POINT.RECRUITMENT}`;

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('모집 공고 조회에 실패했습니다.');
  }

  return res.json();
}
