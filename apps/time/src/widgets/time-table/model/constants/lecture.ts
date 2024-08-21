import { LectureKey, LectureValue } from '@/widgets/time-table';

export const LECTURE = {
  CULTURE: '교양',
  MAJOR: '전공',
  TEACHING: '교직이수',
  ROTC: 'ROTC',
  LINKEDFUSION: '연계융합',
} as const;

export const LECTURE_COLOR: { [key in LectureKey]: string } = {
  CULTURE: 'bg-red-50 hover:bg-red-100',
  MAJOR: 'bg-orange-50 hover:bg-orange-100',
  TEACHING: 'bg-yellow-50 hover:bg-yellow-100',
  ROTC: 'bg-green-50 hover:bg-yellow-100',
  LINKEDFUSION: 'bg-blue-50 hover:bg-blue-100',
} as const;

export const LECTURE_ARRAY = Object.entries(LECTURE) as [
  LectureKey,
  LectureValue,
][];
