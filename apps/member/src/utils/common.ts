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

  const obj1_sort = Object.keys(obj1)
    .sort()
    .reduce((obj, key) => ((obj[key] = obj1[key]), obj), {});
  const obj2_sort = Object.keys(obj2)
    .sort()
    .reduce((obj, key) => ((obj[key] = obj2[key]), obj), {});

  return JSON.stringify(obj1_sort) === JSON.stringify(obj2_sort);
}
