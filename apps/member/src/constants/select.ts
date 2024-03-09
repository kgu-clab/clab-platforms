export const SELECT_OPTIONS = {
  ACCOUNT_PANEL: [
    { name: 1, value: '1시간' },
    { name: 2, value: '2시간' },
    { name: 3, value: '3시간' },
    { name: 4, value: '4시간' },
  ] as const,
  SUPPORT_FORM: [
    {
      name: '도서',
      value: 'book',
    },
    {
      name: '강의',
      value: 'lecture',
    },
    {
      name: '기타',
      value: 'etc',
    },
  ] as const,
} as const;
