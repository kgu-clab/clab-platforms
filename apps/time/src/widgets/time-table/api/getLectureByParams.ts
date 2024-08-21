import { getAPIURL } from '@/shared/utils';
import {
  DayCampus,
  DayPeriod,
  LectureKey,
  NightCampus,
  NightPeriod,
  TIMETABLE_ENDPOINT,
} from '@/widgets/time-table';

export interface GetLectureByParamsValue {
  id: number;
  campus: DayCampus | NightCampus;
  type: LectureKey;
  category: string;
  name: string;
  professor: string;
  room: string | null;
  time: DayPeriod | NightPeriod;
}

export interface GetLectureByParamsResponse {
  success: boolean;
  data: GetLectureByParamsValue[];
}

export async function getLectureByParams(
  idList: number[],
): Promise<GetLectureByParamsResponse> {
  const apiURL = getAPIURL(TIMETABLE_ENDPOINT.LECTURE_BY_PARAMS);

  idList.forEach((id) => apiURL.searchParams.append('lectureIds', String(id)));

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('선택된 강의 목록을 불러오는데 실패했습니다');
  }

  return res.json();
}
