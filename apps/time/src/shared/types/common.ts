import { ReactNode } from 'react';

import { DAY } from '@/shared/constants';

export type StrictPropsWithChildren<P = unknown> = P & {
  children: ReactNode;
};

export type DayEng = keyof typeof DAY;

export type DayKor = (typeof DAY)[keyof typeof DAY];
