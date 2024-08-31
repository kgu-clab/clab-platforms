import type {
  GetLectureListParams,
  GetMajorListParams,
} from '@/widgets/time-table/api';

const timeTableQueryKeys = {
  getLectureList: (params: GetLectureListParams) => ['getLectureList', params],
  getMajorList: (params: GetMajorListParams) => ['getMajorList', params],
  getLectureByParams: (params: number[]) => ['getLectureByParams', params],
};

export default timeTableQueryKeys;
