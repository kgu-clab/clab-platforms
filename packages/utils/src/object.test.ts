import { isObjectsEqual } from '.';

describe('Object Utils', () => {
  describe('isObjectsEqual function', () => {
    it('should return true if the object is compared with itself', () => {
      const obj = { a: 1 };
      expect(isObjectsEqual(obj, obj)).toBe(true);
    });

    it('should return true if two objects are identical', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return false if two objects are not identical', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };
      expect(isObjectsEqual(obj1, obj2)).toBe(false);
    });

    it('should handle objects with different property orders as identical', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 2, a: 1 };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return true for nested objects that are identical', () => {
      const obj1 = { a: 1, b: { c: 3, d: 4 } };
      const obj2 = { a: 1, b: { c: 3, d: 4 } };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for nested objects that are not identical', () => {
      const obj1 = { a: 1, b: { c: 3, d: 4 } };
      const obj2 = { a: 1, b: { c: 5, d: 4 } };
      expect(isObjectsEqual(obj1, obj2)).toBe(false);
    });

    it('should return true when comparing two empty objects', () => {
      expect(isObjectsEqual({}, {})).toBe(true);
    });

    it('should return true for objects with different but equivalent date values', () => {
      const obj1 = { date: new Date('2021-01-01') };
      const obj2 = { date: new Date('2021-01-01') };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return false when objects have different types of properties', () => {
      const obj1 = { num: 1 };
      const obj2 = { num: '1' };
      expect(isObjectsEqual(obj1, obj2)).toBe(false);
    });
  });
});
