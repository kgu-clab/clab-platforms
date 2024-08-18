import { GetLectureListParams, GetMajorListParams } from '@/widgets/time-table';

const timeTableQueryKeys = {
  getLectureList: (params: GetLectureListParams) => ['getLectureList', params],
  getMajorList: (params: GetMajorListParams) => ['getMajorList', params],
};

export default timeTableQueryKeys;