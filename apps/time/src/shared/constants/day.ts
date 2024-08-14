import { DayKor } from '@/shared/types';

const DAY = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
} as const;

const DAY_VALUE_ARRAY: DayKor[] = Object.values(DAY);

export { DAY, DAY_VALUE_ARRAY };
