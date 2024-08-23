/**
 * 주어진 문자가 숫자로만 이루어져 있는지 확인합니다.
 * @param {string} value 입력 문자
 * @returns {boolean}숫자로 된 문자열인지 판단한 boolean 값
 */
export const isNumeric = (value: string) => /^\d+$/.test(value);
