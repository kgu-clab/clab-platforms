import { Suspense, memo } from 'react';

import {
  type GetLectureListParams,
  type GetLectureListResponseValue,
  useLectureList,
} from '@/widgets/time-table';

interface TimeTableLectureTableProps {
  selectedValues: GetLectureListParams;
}

interface TimeTableLectureTableItemProps {
  lecture: GetLectureListResponseValue;
}

const LECTURE_TABLE_ROW_HEADER = [
  '캠퍼스',
  '카테고리',
  '과목코드',
  '학점',
  '학년',
  '전공',
  '수업명',
  '담당교수',
  '학기',
  '시간',
  '수업구분',
] as const;

function TimeTableLectureItem({ lecture }: TimeTableLectureTableItemProps) {
  return (
    <tr className="divide-x divide-gray-300 text-center">
      <td>{lecture.campus}</td>
      <td>{lecture.category}</td>
      <td>{lecture.code}</td>
      <td>{lecture.credit}</td>
      <td>{lecture.grade ?? '-'}</td>
      <td>{lecture.major !== 'None' ? lecture.major : '-'}</td>
      <td>{lecture.name}</td>
      <td>{lecture.professor}</td>
      <td>{lecture.semester}</td>
      <td>{lecture.time}</td>
      <td>{lecture.groupName}</td>
    </tr>
  );
}

function TimeTableLectureContent({
  selectedValues,
}: TimeTableLectureTableProps) {
  const { data } = useLectureList({
    campus: selectedValues.campus,
    type: selectedValues.type,
    grade: selectedValues.grade,
    day: selectedValues.day,
    time: selectedValues.time,
    major: selectedValues.major,
    lectureName: selectedValues.lectureName,
    cursor: 0,
    limit: 10,
  });
  const lectureList = data.data.values;

  return (
    <>
      {lectureList.length ? (
        <>
          {...lectureList.map((lecture) => (
            <TimeTableLectureItem
              key={`lecture-${lecture.id}`}
              lecture={lecture}
            />
          ))}
        </>
      ) : (
        <tr>
          <td colSpan={LECTURE_TABLE_ROW_HEADER.length} className="text-center">
            검색 결과가 없습니다
          </td>
        </tr>
      )}
    </>
  );
}

function TimeTableLectureTable({ selectedValues }: TimeTableLectureTableProps) {
  return (
    <table className="mt-3 w-full table-auto border-collapse border border-gray-400 text-sm">
      <thead className="w-full border border-gray-400 text-center">
        <tr className="divide-x divide-gray-400 border border-gray-400 bg-gray-100">
          {LECTURE_TABLE_ROW_HEADER.map((header) => (
            <td className="py-2" key={header}>
              {header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="h-80 w-full divide-y divide-gray-300 overflow-y-scroll">
        <Suspense
          fallback={
            <tr>
              <td
                colSpan={LECTURE_TABLE_ROW_HEADER.length}
                className="text-center"
              >
                강의 정보를 불러오고 있습니다
              </td>
            </tr>
          }
        >
          <TimeTableLectureContent selectedValues={selectedValues} />
        </Suspense>
      </tbody>
    </table>
  );
}

export default memo(TimeTableLectureTable);
