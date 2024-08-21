'use client';

import { memo } from 'react';

import { MODAL_KEY } from '@/shared/constants';
import { useInfiniteScroll, useModalAction } from '@/shared/hooks';
import {
  type GetLectureListParams,
  type GetLectureListResponseValue,
  SPECIAL_PERIOD,
  useLectureList,
  useTimeTableParams,
} from '@/widgets/time-table';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';

interface TimeTableLectureTableProps {
  isAddableLecture: (time: string) => boolean;
  selectedValues: GetLectureListParams;
}

interface TimeTableLectureTableItemProps {
  isAddableLecture: (time: string) => boolean;
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

function TimeTableLectureItem({
  isAddableLecture,
  lecture,
}: TimeTableLectureTableItemProps) {
  const { searchParamsAction } = useTimeTableParams();
  const { close } = useModalAction({ key: MODAL_KEY.timeTable });
  const router = useRouter();
  const specialPeriodSet = new Set<string>(SPECIAL_PERIOD);

  const handleTimeTableLectureItem = () => {
    if (specialPeriodSet.has(lecture.time)) {
      searchParamsAction.append('id', lecture.id.toString());
      router.push(`/timetable?${searchParamsAction.getParams()}`);
      close();
      return;
    }

    if (isAddableLecture(lecture.time)) {
      searchParamsAction.append('id', lecture.id.toString());
      router.push(`/timetable?${searchParamsAction.getParams()}`);
      close();
    } else {
      alert('선택된 시간에 이미 수강하는 강의가 존재합니다.');
    }
  };

  return (
    <tr
      className="h-12 cursor-pointer divide-x divide-gray-300 text-[12px] transition-colors hover:bg-gray-50"
      onClick={() => handleTimeTableLectureItem()}
    >
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.campus}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.category}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.code}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.credit}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.grade ?? '-'}</td>
      <td className="shrink-0 whitespace-nowrap p-2">
        {lecture.major !== 'None' ? lecture.major : '-'}
      </td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.name}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.professor}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.semester}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.time}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.groupName}</td>
    </tr>
  );
}

function TimeTableLectureContent({
  isAddableLecture,
  selectedValues,
}: TimeTableLectureTableProps) {
  const { data, hasNextPage, fetchNextPage } = useLectureList({
    campus: selectedValues.campus,
    type: selectedValues.type,
    grade: selectedValues.grade,
    day: selectedValues.day,
    time: selectedValues.time,
    major: selectedValues.major,
    lectureName: selectedValues.lectureName,
    limit: 12,
  });
  const scrollRef = useInfiniteScroll(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  return (
    <tbody className="size-full divide-y divide-gray-300">
      {data && (
        <>
          {data.length ? (
            <>
              {...data.map((lecture) => (
                <TimeTableLectureItem
                  isAddableLecture={isAddableLecture}
                  key={`lecture-${lecture.id}`}
                  lecture={lecture}
                />
              ))}
            </>
          ) : (
            <tr className="h-full">
              <td
                colSpan={LECTURE_TABLE_ROW_HEADER.length}
                className="h-full text-center"
              >
                검색 결과가 없습니다
              </td>
            </tr>
          )}
        </>
      )}
      {hasNextPage && (
        <tr className="block">
          <td
            ref={(node) => {
              scrollRef.current = node;
            }}
            colSpan={LECTURE_TABLE_ROW_HEADER.length}
            className="h-1"
          />
        </tr>
      )}
    </tbody>
  );
}

function TimeTableLectureTable({
  selectedValues,
  isAddableLecture,
}: TimeTableLectureTableProps) {
  return (
    <div className="mt-3 h-96 w-full overflow-y-scroll">
      <table className="size-full table-auto border-separate border-spacing-0 break-keep border-x border-b border-gray-400 text-sm">
        <thead className="sticky top-0 z-20 w-full text-center">
          <tr className="divide-x divide-gray-400 bg-gray-100">
            {LECTURE_TABLE_ROW_HEADER.map((header) => (
              <th
                className="whitespace-nowrap border-y border-gray-400 p-2"
                key={header}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <ErrorBoundary
          fallback={
            <tr>
              <td
                colSpan={LECTURE_TABLE_ROW_HEADER.length}
                className="text-center"
              >
                강의 정보 불러오기에 실패했습니다.
              </td>
            </tr>
          }
        >
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
            <TimeTableLectureContent
              isAddableLecture={isAddableLecture}
              selectedValues={selectedValues}
            />
          </Suspense>
        </ErrorBoundary>
      </table>
    </div>
  );
}

export default memo(TimeTableLectureTable);
