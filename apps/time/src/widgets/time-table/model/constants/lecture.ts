import { LectureKey, LectureValue } from '@/widgets/time-table';

export const LECTURE = {
  CULTURE: '교양',
  MAJOR: '전공',
  TEACHING: '교직이수',
  ROTC: 'ROTC',
  LINKEDFUSION: '연계융합',
} as const;

export const LECTURE_ARRAY = Object.entries(LECTURE) as [
  LectureKey,
  LectureValue,
][];
