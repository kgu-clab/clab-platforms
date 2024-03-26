/**
 * 주어진 숫자를 한국식 통화 형식으로 포맷합니다.
 * @param amount 포맷할 숫자
 * @returns 포맷된 숫자 문자열
 */
export function formatWon(amount: number): string {
  return amount.toLocaleString('ko-KR');
}
