import {
  cn,
  createPagination,
  createURL,
  formatComma,
  formatWon,
  toDecodeHTMLEntities,
} from '.';

describe('String Utils', () => {
  describe('cn function', () => {
    it('should correctly merge class names using clsx and tailwind-merge', () => {
      const result = cn('btn', 'btn-primary', { active: true });
      expect(result).toBe('btn btn-primary active');
    });
  });

  describe('createURL function', () => {
    it('should correctly concatenate path segments into a single URL', () => {
      const url = createURL('users', 123, 'profile');
      expect(url).toBe('users/123/profile');
    });

    it('should handle undefined values in paths', () => {
      const url = createURL('users', undefined, 'profile');
      expect(url).toBe('users/profile');
    });
  });

  describe('createPagination function', () => {
    it('should create a correct query string from given parameters', () => {
      const url = createPagination('api/users', { page: 1, limit: 10 });
      expect(url).toBe('api/users?page=1&limit=10');
    });
  });

  describe('formatWon function', () => {
    it('should format numbers to Korean currency style', () => {
      const formatted = formatWon(100000);
      expect(formatted).toBe('100,000');
    });
  });

  describe('formatComma function', () => {
    it('should format numbers with commas', () => {
      const formatted = formatComma(100000);
      expect(formatted).toBe('100,000');
    });

    it('should return empty string for falsy values', () => {
      const formatted = formatComma(0);
      expect(formatted).toBe('');
    });
  });

  describe('toDecodeHTMLEntities function', () => {
    it('should decode HTML entities', () => {
      const decoded = toDecodeHTMLEntities('&amp;');
      expect(decoded).toBe('&');
    });

    it('should return empty string if input is undefined', () => {
      const decoded = toDecodeHTMLEntities();
      expect(decoded).toBe('');
    });
  });
});
