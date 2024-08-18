import { getAPIURL } from '@/shared/utils';
import { TIMETABLE_ENDPOINT } from '@/widgets/time-table';

export interface GetMajorListParams {
  major: string;
}

export interface GetMajorListResponse {
  success: boolean;
  data: string[];
}

export async function getMajorList({
  major,
}: GetMajorListParams): Promise<GetMajorListResponse> {
  const apiURL = getAPIURL(TIMETABLE_ENDPOINT.MAJOR_LIST);

  apiURL.searchParams.set('major', major);

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('전공 리스트 불러오기에 실패했습니다.');
  }

  return res.json();
}
