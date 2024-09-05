'use client';

import { memo } from 'react';

import { MODAL_KEY } from '@/shared/constants';
import { useInfiniteScroll, useModalAction } from '@/shared/hooks';
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
  { title: '캠퍼스', size: 2 },
  { title: '카테고리', size: 2 },
  { title: '과목코드', size: 2 },
  { title: '학점', size: 2 },
  { title: '학년', size: 2 },
  { title: '전공', size: 3 },
  { title: '수업명', size: 4 },
  { title: '담당교수', size: 3 },
  { title: '학기', size: 2 },
  { title: '시간', size: 3 },
  { title: '수업구분', size: 7 },
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
  const { close } = useModalAction({ key: MODAL_KEY.timeTable });
  const router = useRouter();
  const specialPeriodSet = new Set<string>(SPECIAL_PERIOD);

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

  return (
    <tr
      className="h-12 shrink-0 cursor-pointer divide-x divide-gray-300 text-[12px] transition-colors hover:bg-gray-50"
      onClick={() => handleTimeTableLectureItem()}
    >
      <td className="whitespace-nowrap p-2">{lecture.campus}</td>
      <td className="whitespace-nowrap p-2">{lecture.category}</td>
      <td className="whitespace-nowrap p-2">{lecture.code}</td>
      <td className="whitespace-nowrap p-2">{lecture.credit}</td>
      <td className="whitespace-nowrap p-2">{lecture.grade ?? '-'}</td>
      <td className="whitespace-nowrap p-2">
        {lecture.major !== 'None' ? lecture.major : '-'}
      </td>
      <td className="whitespace-nowrap p-2">{lecture.name}</td>
      <td className="whitespace-nowrap p-2">{lecture.professor}</td>
      <td className="whitespace-nowrap p-2">{lecture.semester}</td>
      <td className="whitespace-nowrap p-2">{lecture.time}</td>
      <td className="whitespace-nowrap p-2">{lecture.groupName}</td>
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
    <div className="mt-3 flex grow overflow-auto text-sm">
      <table className="h-full w-auto grow table-fixed border-separate border-spacing-0 break-keep border-x border-b border-gray-400">
        <thead className="sticky top-0 z-20 size-full h-12 text-center">
          <tr className="divide-x divide-gray-400 bg-gray-100">
            {LECTURE_TABLE_ROW_HEADER.map(({ title, size }) => (
              <th
                className="shrink-0 whitespace-nowrap border-y border-gray-400 px-1 py-2"
                key={title}
                style={{ minWidth: `${size * 2}rem` }}
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
