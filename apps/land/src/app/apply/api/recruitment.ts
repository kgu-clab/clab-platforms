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

/**
 * 모집 공고 상세 조회
 */
export async function getRecruitmentDetail(id: number) {
  const apiURL = `${API_BASE_URL}${END_POINT.RECRUITMENT_DETAIL(id)}`;

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('모집 공고 상세 조회에 실패했습니다.');
  }

  return res.json();
}
/**
 * 최근 일주일 내 종료된 모집공고 조회
 */
export async function getRecentRecruitment() {
  const apiURL = `${API_BASE_URL}${END_POINT.RECENT_RECRUITMENT}`;

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('최근 일주일 내 모집공고 조회에 실패했습니다.');
  }

  return res.json();
}
