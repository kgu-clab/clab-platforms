import { CAMPUS_STATUS, DAY_STATUS, REGION } from '@/widgets/time-table';

export type Region = (typeof REGION)[keyof typeof REGION];

export type DayStatus = keyof typeof DAY_STATUS;

export type DayCampus = (typeof CAMPUS_STATUS.day)[number];

export type NightCampus = (typeof CAMPUS_STATUS.night)[number];
