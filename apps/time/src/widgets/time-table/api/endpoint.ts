const TIMETABLE_ENDPOINT = {
  LECTURE_LIST: 'v1/lecture/retrieve',
  MAJOR_LIST: 'v1/lecture/retrieve/major',
  LECTURE_BY_PARAMS: 'v1/lecture/retrieve/select',
} as const;

export default TIMETABLE_ENDPOINT;
