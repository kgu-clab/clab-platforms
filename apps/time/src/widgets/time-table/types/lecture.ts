import { LECTURE } from '@/widgets/time-table/model';

export type LectureKey = keyof typeof LECTURE;

export type LectureValue = (typeof LECTURE)[keyof typeof LECTURE];
