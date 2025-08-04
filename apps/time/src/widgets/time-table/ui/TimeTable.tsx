'use client';

import { PropsWithChildren, memo } from 'react';

import { cn } from '@clab-platforms/utils';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import type { GetLectureByParamsValue } from '@/widgets/time-table/api';
import {
  DAY_PERIOD_ARRAY,
  LECTURE_COLOR,
  NIGHT_PERIOD_ARRAY,
  useLectureByParams,
  useTimeTableParams,
} from '@/widgets/time-table/model';

import TimeTableUtilButtons from './TimeTableUtilButtons';

interface TimeTableHeaderProps extends PropsWithChildren {
  type: 'ROW' | 'COLUMN';
  className?: string;
}

interface TimeTableItemProps extends PropsWithChildren {
  bgColor?: string | null;
  rowSpan?: number;
}

interface TimeTableSpecialLectureTableProps {
  specialLectureGroup: GetLectureByParamsValue[];
  handleSpecialLecture: (id: number | undefined) => void;
}

interface TimeTableSpecialLectureTableItemProps {
  lecture: GetLectureByParamsValue;
  handleSpecialLecture: (id: number | undefined) => void;
}

const SPECIAL_LECTURE_TABLE_HEADER = [
  '캠퍼스',
  '카테고리',
  '강의명',
  '교수',
  '수업구분',
] as const;

function TimeTableHeader({ type, children, className }: TimeTableHeaderProps) {
  return type === 'ROW' ? (
    <th
      className={cn(
        'bg-time-table-header border-time-table-border h-9 border font-normal',
        className,
      )}
    >
      {children}
    </th>
  ) : (
    <td
      className={cn(
        'border-time-table-border w-10 border bg-white p-0 text-sm sm:w-fit sm:p-2',
        className,
      )}
    >
      {children}
    </td>
  );
}

function TimeTableItem({ bgColor, rowSpan, children }: TimeTableItemProps) {
  return (
    <td
      className={cn(
        'border-time-table-border h-10 cursor-pointer border text-sm transition-colors',
        bgColor ?? 'hover:bg-gray-100',
      )}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
}

export function TimeTableSpecialLectureTable({
  handleSpecialLecture,
  specialLectureGroup,
}: TimeTableSpecialLectureTableProps) {
  return (
    <div className="w-full space-y-2">
      <h2 className="text-lg font-normal">이러닝 / 사회봉사 / 교외수업</h2>
      <table className="border-time-table-border w-full border">
        <thead>
          <tr className="border-time-table-border divide-time-table-border divide-x border bg-gray-50">
            {SPECIAL_LECTURE_TABLE_HEADER.map((header) => (
              <th
                key={header}
                className="bg-time-table-header px-4 py-2 font-normal"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-time-table-border w-full divide-y">
          {specialLectureGroup.length ? (
            <>
              {...specialLectureGroup.map((lecture) => (
                <TimeTableSpecialLectureItem
                  key={`special-lecture-${lecture.id}`}
                  handleSpecialLecture={handleSpecialLecture}
                  lecture={lecture}
                />
              ))}
            </>
          ) : (
            <tr className="bg-time-table-header w-full text-center">
              <td
                className="bg-white px-10 py-24"
                colSpan={SPECIAL_LECTURE_TABLE_HEADER.length}
              >
                선택된 이러닝 / 사회봉사 / 교외수업이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TimeTableSpecialLectureItem({
  lecture,
  handleSpecialLecture,
}: TimeTableSpecialLectureTableItemProps) {
  const { campus, category, name, professor, time } = lecture;

  return (
    <tr
      className="divide-time-table-border h-9 cursor-pointer divide-x bg-white text-[12px] transition-colors hover:bg-gray-50"
      onClick={() => handleSpecialLecture(lecture.id)}
    >
      <td className="shrink-0 whitespace-nowrap p-2">{campus}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{category}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{name}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{professor}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{time}</td>
    </tr>
  );
}

function TimeTable() {
  const { dayStatus, searchParamsAction } = useTimeTableParams();
  const selectedSchedule =
    dayStatus === 'day' ? DAY_PERIOD_ARRAY : NIGHT_PERIOD_ARRAY;
  const selectedIdList = searchParamsAction.getAll('id').map(Number);
  const { basicLectureGroup, specialLectureGroup } =
    useLectureByParams(selectedIdList);

  const handleTimeTableFillButton = (id: number | undefined) => {
    if (id) {
      const currentIds = searchParamsAction.getAll('id').map(Number);
      const updatedIds = currentIds.filter((currentId) => currentId !== id);

      searchParamsAction.remove('id');
      updatedIds.forEach((id) => {
        searchParamsAction.append('id', id.toString());
      });
    }
  };

  return (
    <>
      <table className="w-full table-fixed border-collapse bg-white shadow-sm">
        <thead className="w-full">
          <tr>
            <TimeTableHeader type="COLUMN" className="bg-time-table-header" />
            {DAY_VALUE_ARRAY.map((day) => (
              <TimeTableHeader key={day} type="ROW">
                {day}
              </TimeTableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedSchedule.map(([period, time], periodIndex) => {
            return (
              <tr key={period} className="text-center">
                <TimeTableHeader type="COLUMN">
                  <p className="text-md flex justify-center">
                    {period}
                    <span className="hidden sm:block">교시</span>
                  </p>
                  <p className="hidden text-nowrap text-xs md:block">
                    {time.string}
                  </p>
                </TimeTableHeader>
                {basicLectureGroup[period].map(({ value, head }, idx) => {
                  let rowSpan = 1;
                  if (value && head) {
                    for (
                      let i = 1;
                      i < selectedSchedule.length - periodIndex;
                      i++
                    ) {
                      const nextPeriod = selectedSchedule[periodIndex + i]?.[0];
                      if (
                        nextPeriod &&
                        basicLectureGroup[nextPeriod]?.[idx]?.value?.id ===
                          value.id
                      ) {
                        rowSpan++;
                      } else {
                        break;
                      }
                    }
                  }

                  if (value && !head) {
                    return null;
                  }

                  return (
                    <TimeTableItem
                      key={`${period}-${idx + 1}`}
                      bgColor={value ? LECTURE_COLOR[value.type] : null}
                      rowSpan={rowSpan > 1 ? rowSpan : undefined}
                    >
                      <button
                        type="button"
                        className="size-full p-2 focus:outline-0"
                        onClick={() => handleTimeTableFillButton(value?.id)}
                      >
                        {value && head && (
                          <div className="flex size-full flex-col gap-y-2 break-all text-start">
                            <p className="text-base font-bold">{value.name}</p>
                            <div className="text-xs text-gray-500">
                              <p>{value.professor}</p>
                              <p>{value.room}</p>
                            </div>
                          </div>
                        )}
                      </button>
                    </TimeTableItem>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TimeTableUtilButtons />
      <TimeTableSpecialLectureTable
        specialLectureGroup={specialLectureGroup}
        handleSpecialLecture={(id: number | undefined) => {
          if (id) {
            // 특별 강의도 삭제 가능하도록 동일한 로직 적용
            const currentIds = searchParamsAction.getAll('id').map(Number);
            const updatedIds = currentIds.filter(
              (currentId) => currentId !== id,
            );

            searchParamsAction.remove('id');
            updatedIds.forEach((id) => {
              searchParamsAction.append('id', id.toString());
            });
          }
        }}
      />
    </>
  );
}

export default memo(TimeTable);

TimeTable.displayName = 'TimeTable';
TimeTableItem.displayName = 'TimeTableItem';
