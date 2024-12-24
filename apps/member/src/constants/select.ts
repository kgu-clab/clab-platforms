import type {
  CommunityCategoryKorType,
  CommunityCategoryType,
} from '@type/community';

type Options<N = string, V = string> = {
  name: N;
  value: V;
};

export const SELECT_DEFAULT_OPTION = 'none';

export const SELECT_OPTIONS = {
  ACCOUNT_PANEL: [
    { name: '1', value: '1시간' },
    { name: '2', value: '2시간' },
    { name: '3', value: '3시간' },
    { name: '4', value: '4시간' },
  ],
  MY_FIELD: [
    { name: 'Null', value: 'Null' },
    { name: 'Front-end', value: 'Front-end' },
    { name: 'Back-end', value: 'Back-end' },
    { name: 'Security', value: 'Security' },
    { name: 'AI', value: 'AI' },
    { name: 'Data', value: 'Data' },
    { name: 'VR/AR', value: 'VR/AR' },
    { name: 'Game', value: 'Game' },
  ],
  STUDENT_STATUS: [
    { name: '재학생', value: 'CURRENT' },
    { name: '휴학생', value: 'ON_LEAVE' },
    { name: '졸업생', value: 'GRADUATED' },
  ],
  GRADE: [
    { name: '1학년', value: 1 },
    { name: '2학년', value: 2 },
    { name: '3학년', value: 3 },
    { name: '4학년', value: 4 },
    { name: '5학년', value: 5 },
  ],
} as const;

export const SELECT_OPTIONS_COMMUNITY_TYPE: Options<
  CommunityCategoryKorType,
  CommunityCategoryType
>[] = [
  {
    name: '자유',
    value: 'free',
  },
  {
    name: '개발 질문',
    value: 'development_qna',
  },
  {
    name: '정보 및 후기',
    value: 'information_reviews',
  },
] as const;

export const SELECT_ACTIVITY_GROUP_CATEGORY_TYPE = {
  STUDY: 'STUDY',
  PROJECT: 'PROJECT',
} as const;
