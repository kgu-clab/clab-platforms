import {
  DAY_PERIOD,
  NIGHT_PERIOD,
  PERIOD_STATUS,
  SPECIAL_PERIOD,
} from '@/widgets/time-table';

export type SpecialPeriod = (typeof SPECIAL_PERIOD)[number];

export type DayOnlyPeriod = keyof typeof DAY_PERIOD;

export type DayPeriod = DayOnlyPeriod | SpecialPeriod;

export type NightOnlyPeriod = keyof typeof NIGHT_PERIOD;

export type NightPeriod = NightOnlyPeriod | SpecialPeriod;

export type PeriodStatus = (typeof PERIOD_STATUS)[keyof typeof PERIOD_STATUS];
