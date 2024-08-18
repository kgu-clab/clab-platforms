import { DayKor } from '@/shared/types';
import type {
  DayCampus,
  DayPeriod,
  Grade,
  LectureKey,
  NightCampus,
  NightPeriod,
} from '@/widgets/time-table';
import { TIMETABLE_ENDPOINT } from '@/widgets/time-table';

export interface GetLectureListParams {
  campus: (DayCampus | NightCampus)[];
  type: LectureKey[];
  grade: Grade[];
  day: DayKor[];
  time: (DayPeriod | NightPeriod)[];
  major: string[];
  lectureName: string;
  cursor: number;
  limit: number;
}

export interface GetLectureListResponseValue {
  id: number;
  campus: string;
  category: string;
  code: string;
  credit: number;
  grade: number;
  groupName: string;
  isExceeded: true;
  major: string;
  name: string;
  professor: string;
  room: string;
  year: number;
  semester: string;
  time: string;
  type: LectureKey;
}

export interface GetLectureListResponse {
  success: boolean;
  data: {
    values: GetLectureListResponseValue[];
  };
  hasPrevious: boolean;
  hasNext: boolean;
}

export async function getLectureList({
  ...params
}: GetLectureListParams): Promise<GetLectureListResponse> {
  const apiURL = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${TIMETABLE_ENDPOINT.getLectureList}`,
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      apiURL.searchParams.set(
        key,
        Array.isArray(value) ? value.join(',') : String(value),
      );
    }
  });

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('강의 정보 불러오기에 실패했습니다.');
  }

  return res.json();
}
