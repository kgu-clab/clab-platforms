'use client';

import { memo, useCallback, useState } from 'react';

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
  const {
    professor,
    time,
    major,
    credit,
    grade,
    category,
    code,
    name,
    groupName,
    semester,
    campus,
  } = lecture;

  const isAddedLecture = isLectureAdded(lecture.id);
  const isTimeConflict = !isLectureValid(lecture);

  const handleRowClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isAddedLecture) {
      deleteLecture(lecture.id);
      return;
    }

    if (isTimeConflict) {
      alert('이미 추가된 강의와 시간이 충돌합니다.');
      return;
    }

    addLecture(lecture);
  };

  const Button = () => (
    <button
      onClick={handleButtonClick}
      className={`flex size-6 shrink-0 items-center justify-center rounded-full border bg-white text-xs hover:bg-gray-50 ${
        isAddedLecture
          ? 'border-red-300 text-red-600 hover:bg-red-50'
          : 'border-gray-300 text-gray-600'
      }`}
    >
      {isAddedLecture ? '-' : '+'}
    </button>
  );

  const cellData = [
    { value: category },
    { value: code },
    { value: name },
    { value: professor },
    { value: time },
    {
      value: major !== 'None' ? major : '-',
    },
    { value: credit },
    { value: grade ?? '-' },
    {
      value: <Button />,
    },
  ];

  return (
    <>
      <tr
        key="main"
        className="h-9 max-h-9 shrink-0 cursor-pointer divide-x divide-gray-300 text-center text-sm transition-colors hover:bg-gray-50"
        onClick={handleRowClick}
      >
        {cellData.map(({ value }, index) => (
          <td key={index} className="h-9 max-h-9 overflow-hidden">
            <div className="flex h-9 max-h-9 items-center justify-center truncate whitespace-nowrap">
              {value}
            </div>
          </td>
        ))}
      </tr>

      {isExpanded && (
        <tr key="expanded" className="h-9 max-h-9 bg-gray-50">
          <td
            colSpan={LECTURE_TABLE_ROW_HEADER.length}
            className="max-h-9 p-2 text-sm text-gray-600"
          >
            <div className="flex flex-wrap gap-4">
              <span>수업 구분 : {groupName}</span>
              <span>학기 : {semester}</span>
              <span>캠퍼스 : {campus}</span>
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

  const renderTableBody = useCallback(() => {
    if (!data) {
      return (
        <TimeTableLectureNotification text="강의 정보를 불러오고 있습니다" />
      );
    }

    if (data.length === 0) {
      return <TimeTableLectureNotification text="검색 결과가 없습니다" />;
    }

    return data.map((lecture) => (
      <TimeTableLectureItem key={`lecture-${lecture.id}`} lecture={lecture} />
    ));
  }, [data]);

  const renderTableFooter = useCallback(() => {
    if (!hasNextPage) return null;

    return (
      <tr className="block">
        <td
          ref={(node) => {
            scrollRef.current = node;
          }}
          colSpan={LECTURE_TABLE_ROW_HEADER.length}
          className="h-1"
          aria-label="무한 스크롤 트리거"
        />
      </tr>
    );
  }, [hasNextPage, scrollRef]);

  return (
    <>
      {renderTableBody()}
      {renderTableFooter()}
    </>
  );
}

function TimeTableLectureTable({ selectedValues }: TimeTableLectureTableProps) {
  return (
    <div className="mt-4 flex max-h-[560px] grow overflow-y-auto text-sm">
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
        <tbody className="divide-y divide-gray-300">
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
        </tbody>
      </table>
    </div>
  );
}

export default memo(TimeTableLectureTable);
