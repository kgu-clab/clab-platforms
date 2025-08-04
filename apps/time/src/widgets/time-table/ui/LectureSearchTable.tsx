'use client';

import { memo, useState } from 'react';

import { useInfiniteScroll } from '@/shared/hooks';
import type {
  GetLectureListParams,
  GetLectureListResponseValue,
} from '@/widgets/time-table/api';
import { useLecture, useLectureList } from '@/widgets/time-table/model';
import { ErrorBoundary, Suspense } from '@suspensive/react';

interface TimeTableLectureTableProps {
  selectedValues: GetLectureListParams;
}

interface TimeTableLectureTableItemProps {
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

function TimeTableLectureItem({ lecture }: TimeTableLectureTableItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addLecture, deleteLecture, isLectureAdded, isLectureValid } =
    useLecture();

  const isAddedLecture = isLectureAdded(lecture.id);
  const isTimeConflict = !isLectureValid(lecture);

  const handleRowClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTimeConflict) {
      alert('이미 추가된 강의와 시간이 충돌합니다.');
      return;
    }
    addLecture(lecture);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteLecture(lecture.id);
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
          {isAddedLecture ? (
            <button
              onClick={handleDeleteClick}
              className="flex size-6 shrink-0 items-center justify-center rounded-full border border-red-300 bg-white text-red-600 hover:bg-red-50"
            >
              <span className="text-xs">-</span>
            </button>
          ) : (
            <button
              onClick={handleAddClick}
              className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            >
              <span className="text-xs">+</span>
            </button>
          )}
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

function TimeTableLectureTable({ selectedValues }: TimeTableLectureTableProps) {
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
            <TimeTableLectureContent selectedValues={selectedValues} />
          </Suspense>
        </ErrorBoundary>
      </table>
    </div>
  );
}

export default memo(TimeTableLectureTable);
