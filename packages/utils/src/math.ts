/**
 * 0부터 주어진 최대값 사이의 랜덤한 정수를 반환합니다.
 * @param {number} max - 랜덤 숫자의 최대 범위 (이 값 포함)
 * @return {number} 0부터 max 사이의 랜덤 정수
 */
export const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * (max + 1));
};
