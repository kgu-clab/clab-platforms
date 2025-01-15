import { API_BASE_URL, END_POINT } from '@/constants';

interface GetApplyPassedProps {
  recruitmentId: number;
  studentId: string;
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
