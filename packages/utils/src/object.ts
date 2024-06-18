/**
 * 두 객체가 동일한지 깊은 비교를 통해 확인합니다.
 *
 * @param {object} obj1 비교할 첫 번째 객체입니다.
 * @param {object} obj2 비교할 두 번째 객체입니다.
 * @returns {boolean} 두 객체가 동일하면 true, 그렇지 않으면 false를 반환합니다.
 */
export function isObjectsEqual(obj1: object, obj2: object): boolean {
  // 두 객체의 참조가 같으면 빠르게 true를 반환합니다.
  if (obj1 === obj2) return true;

  const sortedObj1: { [key: string]: unknown } = Object.fromEntries(
    Object.entries(obj1).sort(),
  );
  const sortedObj2: { [key: string]: unknown } = Object.fromEntries(
    Object.entries(obj2).sort(),
  );

  return JSON.stringify(sortedObj1) === JSON.stringify(sortedObj2);
}
