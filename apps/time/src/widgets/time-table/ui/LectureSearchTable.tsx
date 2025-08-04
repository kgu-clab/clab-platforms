'use client';

import { memo, useState } from 'react';

import { useInfiniteScroll } from '@/shared/hooks';
import type {
  GetLectureListParams,
  GetLectureListResponseValue,
} from '@/widgets/time-table/api';
import {
  SPECIAL_PERIOD,
  useLectureList,
  useTimeTableParams,
} from '@/widgets/time-table/model';
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
  { title: '구분', size: 1.5 },
  { title: '과목코드', size: 2 },
  { title: '수업명', size: 3 },
  { title: '담당교수', size: 2 },
  { title: '교시', size: 3 },
  { title: '전공', size: 3 },
  { title: '학점', size: 1 },
  { title: '학년', size: 1 },
  { title: '추가', size: 1 },
] as const;

function TimeTableLectureNotification({ text }: { text: string }) {
  return (
    <tr className="size-full">
      <td
        colSpan={LECTURE_TABLE_ROW_HEADER.length}
        className="size-full px-10 py-40 text-center"
      >
        {text}
      </td>
    </tr>
  );
}

function TimeTableLectureItem({
  isAddableLecture,
  lecture,
}: TimeTableLectureTableItemProps) {
  const { searchParamsAction } = useTimeTableParams();
  const router = useRouter();
  const specialPeriodSet = new Set<string>(SPECIAL_PERIOD);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTimeTableLectureItem = () => {
    if (specialPeriodSet.has(lecture.time) || isAddableLecture(lecture.time)) {
      searchParamsAction.append('id', lecture.id.toString());
      router.push(`/timetable?${searchParamsAction.getParams()}`, {
        scroll: false,
      });
      close();
    } else {
      alert('선택된 시간에 이미 수강하는 강의가 존재합니다.');
    }
  };

  const handleRowClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleTimeTableLectureItem();
  };

  return (
    <>
      <tr
        className="place-items h-9 shrink-0 cursor-pointer divide-x divide-gray-300 text-center text-sm transition-colors hover:bg-gray-50"
        onClick={handleRowClick}
      >
        <td className="truncate p-2">{lecture.category}</td>
        <td className="truncate p-2">{lecture.code}</td>
        <td className="truncate p-2">{lecture.name}</td>
        <td className="truncate p-2">{lecture.professor}</td>
        <td className="truncate p-2">{lecture.time}</td>
        <td className="truncate p-2">
          {lecture.major !== 'None' ? lecture.major : '-'}
        </td>
        <td className="truncate p-2">{lecture.credit}</td>
        <td className="truncate p-2">{lecture.grade ?? '-'}</td>
        <td className="flex items-center justify-center p-2">
          <button
            onClick={handleAddClick}
            className="flex size-6 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
          >
            <span className="text-xs">+</span>
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td
            colSpan={LECTURE_TABLE_ROW_HEADER.length}
            className="p-3 text-sm text-gray-600"
          >
            <div className="flex flex-wrap gap-4">
              <span>수업 구분 : {lecture.groupName}</span>
              <span>학기 : {lecture.semester}</span>
              <span>캠퍼스 : {lecture.campus}</span>
            </div>
          </td>
        </tr>
      )}
    </>
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
      {data ? (
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
            <TimeTableLectureNotification text="검색 결과가 없습니다" />
          )}
        </>
      ) : (
        <TimeTableLectureNotification text="강의 정보를 불러오고 있습니다" />
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
    <div className="mt-4 flex h-[560px] grow overflow-y-auto text-sm">
      <table className="border-time-table-border w-full table-fixed border-separate border-spacing-0 break-keep border-x border-b">
        <thead className="bg-time-table-header sticky top-0 z-20 text-center">
          <tr className="divide-time-table-border bg-time-table-header divide-x">
            {LECTURE_TABLE_ROW_HEADER.map(({ title, size }) => (
              <th
                className="border-time-table-border shrink-0 whitespace-nowrap border-y px-1 py-2 font-normal"
                key={title}
                style={{ width: `${size * 2}rem` }}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <ErrorBoundary
          fallback={
            <TimeTableLectureNotification text="강의 정보 불러오기에 실패했습니다" />
          }
        >
          <Suspense
            fallback={
              <TimeTableLectureNotification text="강의 정보를 불러오고 있습니다" />
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
