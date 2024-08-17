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
  const apiURL = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${TIMETABLE_ENDPOINT.getMajorList}`,
  );

  apiURL.searchParams.set('major', major);

  const res = await fetch(apiURL);

  if (!res.ok) {
    throw new Error('전공 리스트 불러오기에 실패했습니다.');
  }

  return res.json();
}
