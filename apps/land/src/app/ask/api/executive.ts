import { API_BASE_URL, END_POINT } from '@/constants';

/**
 * 운영진 정보 조회
 */
export async function getExecutive() {
  const apiURL = `${API_BASE_URL}${END_POINT.EXECUTIVE}`;

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('운영진 정보 조회에 실패했습니다.');
  }

  return res.json();
}
