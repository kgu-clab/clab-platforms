export const SELECT_OPTIONS = {
  RECRUITMENT_TYPE: [
    { name: '신규', value: 'NORMAL' },
    { name: '운영진', value: 'OPERATION' },
    { name: '코어팀', value: 'CORE_TEAM' },
  ],
  MY_FIELD: [
    { name: 'Null', value: 'Null' },
    { name: 'Front-end', value: 'Front-end' },
    { name: 'Back-end', value: 'Back-end' },
    { name: 'Security', value: 'Security' },
    { name: 'AI', value: 'AI' },
    { name: 'Game', value: 'Game' },
  ],
  GRADE: [
    { name: '1학년', value: 1 },
    { name: '2학년', value: 2 },
    { name: '3학년', value: 3 },
    { name: '4학년', value: 4 },
    { name: '5학년', value: 5 },
  ],
} as const;

/**
 * 지원 동기 및 활동 최대 길이
 * 1000자
 */
export const OTHER_ACTIVITY_MAX_LENGTH = 1000;
