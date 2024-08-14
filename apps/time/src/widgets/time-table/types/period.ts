import { DAY_PERIOD, NIGHT_PERIOD } from '@/widgets/time-table';

type DayPeriod = keyof typeof DAY_PERIOD;

type NightPeriod = keyof typeof NIGHT_PERIOD;

export type { DayPeriod, NightPeriod };
