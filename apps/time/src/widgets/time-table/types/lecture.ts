import { LECTURE } from '@/widgets/time-table';

export type LectureKey = keyof typeof LECTURE;

export type LectureValue = (typeof LECTURE)[keyof typeof LECTURE];
