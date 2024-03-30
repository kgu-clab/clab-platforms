type SelectOptionsType = {
  [key: string]: {
    name: string;
    value: string;
  }[];
};

export const SELECT_DEFAULT_OPTION = 'none';

export const SELECT_OPTIONS: SelectOptionsType = {
  ACCOUNT_PANEL: [
    { name: '1', value: '1시간' },
    { name: '2', value: '2시간' },
    { name: '3', value: '3시간' },
    { name: '4', value: '4시간' },
  ] as const,
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
