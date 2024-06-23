import { getRandomNumber } from '.';

describe('Math Utils', () => {
  describe('getRandomNumber function', () => {
    it('should return a random number within the specified range, including max', () => {
      const max = 10;
      const attempts = 100;

      for (let i = 0; i < attempts; i++) {
        const random = getRandomNumber(max);
        expect(random).toBeGreaterThanOrEqual(0);
        expect(random).toBeLessThanOrEqual(max);
      }
    });

    it('should handle the case where max is 0', () => {
      expect(getRandomNumber(0)).toBe(0);
    });
  });
});
