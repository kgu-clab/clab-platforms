import { API_BASE_URL, END_POINT } from '@/constants';
import type { ApplicationForm } from '@/types';

interface GetApplyPassedProps {
  recruitmentId: number;
  studentId: string;
}

/**
 * 동아리 지원
 */
export async function postApplication(body: ApplicationForm) {
  const apiURL = `${API_BASE_URL}${END_POINT.APPLICATIONS}`;

  const res = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('동아리 지원에 실패했습니다.');
  }

  return res.json();
}

/**
 * 합격 여부 조회
 */
export async function getApplyPassed({
  recruitmentId,
  studentId,
}: GetApplyPassedProps) {
  const apiURL = `${API_BASE_URL}${END_POINT.APPLY_PASSED(recruitmentId, studentId)}`;

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('합격 여부 조회에 실패했습니다.');
  }

  return res.json();
}
/**
 * 현재 모집 중인 공고 조회
 */
export async function getApplicationNow() {
  const apiURL = `${API_BASE_URL}${END_POINT.OPEN}`;

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('현재 모집 중인 공고 조회에 실패했습니다.');
  }

  return res.json();
}
