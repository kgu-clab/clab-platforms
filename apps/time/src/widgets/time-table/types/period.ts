import { DAY_PERIOD, NIGHT_PERIOD, SPECIAL_PERIOD } from '@/widgets/time-table';

export type SpecialPeriod = (typeof SPECIAL_PERIOD)[number];

export type DayPeriod = keyof typeof DAY_PERIOD | SpecialPeriod;

export type NightPeriod = keyof typeof NIGHT_PERIOD | SpecialPeriod;
