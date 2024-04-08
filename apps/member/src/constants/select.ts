import type {
  CommunityCategoryKorType,
  CommunityCategoryType,
} from '@type/community';

type Options<N = string, V = string> = {
  name: N;
  value: V;
};

type SelectOptions<N = string, V = string> = {
  [key: string]: Options<N, V>[];
};

export const SELECT_DEFAULT_OPTION = 'none';

export const SELECT_OPTIONS: SelectOptions = {
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
    name: 'QnA',
    value: 'qna',
  },
] as const;
