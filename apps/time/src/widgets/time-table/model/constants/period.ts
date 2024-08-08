import { DayPeriod, NightPeriod } from '@/widgets/time-table';

const DAY_PERIOD = {
  '1': {
    start: { hour: 9, minute: 0 },
    end: { hour: 9, minute: 50 },
  },
  '1L': {
    start: { hour: 9, minute: 0 },
    end: { hour: 10, minute: 15 },
  },
  '2': {
    start: { hour: 10, minute: 0 },
    end: { hour: 10, minute: 50 },
  },
  '2L': {
    start: { hour: 10, minute: 0 },
    end: { hour: 11, minute: 15 },
  },
  '2.5L': {
    start: { hour: 10, minute: 30 },
    end: { hour: 11, minute: 45 },
  },
  '3': {
    start: { hour: 11, minute: 0 },
    end: { hour: 11, minute: 50 },
  },
  '3L': {
    start: { hour: 11, minute: 0 },
    end: { hour: 12, minute: 15 },
  },
  '4': {
    start: { hour: 12, minute: 0 },
    end: { hour: 12, minute: 50 },
  },
  '4L': {
    start: { hour: 12, minute: 0 },
    end: { hour: 13, minute: 15 },
  },
  '5': {
    start: { hour: 13, minute: 0 },
    end: { hour: 13, minute: 50 },
  },
  '5.5L': {
    start: { hour: 13, minute: 30 },
    end: { hour: 14, minute: 45 },
  },
  '6': {
    start: { hour: 14, minute: 0 },
    end: { hour: 14, minute: 50 },
  },
  '6L': {
    start: { hour: 14, minute: 0 },
    end: { hour: 15, minute: 15 },
  },
  '7': {
    start: { hour: 15, minute: 0 },
    end: { hour: 15, minute: 50 },
  },
  '7L': {
    start: { hour: 15, minute: 0 },
    end: { hour: 16, minute: 15 },
  },
  '7.5L': {
    start: { hour: 15, minute: 30 },
    end: { hour: 16, minute: 45 },
  },
  '8': {
    start: { hour: 16, minute: 0 },
    end: { hour: 16, minute: 50 },
  },
  '9': {
    start: { hour: 17, minute: 0 },
    end: { hour: 17, minute: 50 },
  },
} as const;

const NIGHT_PERIOD = {
  '1': {
    start: { hour: 17, minute: 50 },
    end: { hour: 18, minute: 35 },
  },
  '2': {
    start: { hour: 18, minute: 40 },
    end: { hour: 19, minute: 25 },
  },
  '3': {
    start: { hour: 19, minute: 30 },
    end: { hour: 20, minute: 15 },
  },
  '4': {
    start: { hour: 20, minute: 20 },
    end: { hour: 21, minute: 5 },
  },
  '5': {
    start: { hour: 21, minute: 10 },
    end: { hour: 21, minute: 55 },
  },
  '6': {
    start: { hour: 22, minute: 0 },
    end: { hour: 22, minute: 45 },
  },
} as const;

const DAY_PERIOD_KEYS = Object.keys(DAY_PERIOD) as DayPeriod[];

const DAY_PERIOD_ARRAY = Object.entries(DAY_PERIOD).sort(
  ([, periodA], [, periodB]) => {
    const timeA = periodA.start.hour * 60 + periodA.start.minute;
    const timeB = periodB.start.hour * 60 + periodB.start.minute;

    return timeA - timeB;
  },
);

const NIGHT_PERIOD_KEYS = Object.keys(NIGHT_PERIOD) as NightPeriod[];

const NIGHT_PERIOD_ARRAY = Object.entries(NIGHT_PERIOD).sort(
  ([, periodA], [, periodB]) => {
    const timeA = periodA.start.hour * 60 + periodA.start.minute;
    const timeB = periodB.start.hour * 60 + periodB.start.minute;

    return timeA - timeB;
  },
);

const DAY_STATUS = {
  day: '주간',
  night: '야간',
} as const;

export {
  DAY_PERIOD,
  NIGHT_PERIOD,
  DAY_PERIOD_KEYS,
  DAY_PERIOD_ARRAY,
  NIGHT_PERIOD_KEYS,
  NIGHT_PERIOD_ARRAY,
  DAY_STATUS,
};
