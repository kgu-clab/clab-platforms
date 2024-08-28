'use client';

import { PropsWithChildren, memo, useState } from 'react';

import { cn } from '@clab-platforms/utils';

import { DAY_VALUE_ARRAY, MODAL_KEY } from '@/shared/constants';
import { useModalAction } from '@/shared/hooks';
import type { DayKor } from '@/shared/types';
import {
  DAY_PERIOD_ARRAY,
  type DayPeriod,
  GetLectureByParamsValue,
  LECTURE_COLOR,
  NIGHT_PERIOD_ARRAY,
  type NightPeriod,
  PERIOD_STATUS,
  TimeTableLectureRemoveModal,
  TimeTableModal,
  getFormattedTime,
  getLectureFillRange,
  useLectureByParams,
  useTimeTableParams,
} from '@/widgets/time-table';

interface TimeTableHeaderProps extends PropsWithChildren {
  type: 'ROW' | 'COLUMN';
}

interface TimeTableItemProps extends PropsWithChildren {
  bgColor?: string | null;
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

function TimeTableHeader({ type, children }: TimeTableHeaderProps) {
  return type === 'ROW' ? (
    <th className="h-16 border border-gray-400 bg-gray-50">{children}</th>
  ) : (
    <td className="h-24 w-12 border border-gray-400 bg-gray-50 p-0 text-sm sm:w-fit sm:p-4">
      {children}
    </td>
  );
}

function TimeTableItem({ bgColor, children }: TimeTableItemProps) {
  return (
    <td
      className={cn(
        'h-24 cursor-pointer border border-gray-400 text-sm transition-colors',
        bgColor ?? 'hover:bg-gray-100',
      )}
    >
      {children}
    </td>
  );
}

function TimeTableSpecialLectureTable({
  handleSpecialLecture,
  specialLectureGroup,
}: TimeTableSpecialLectureTableProps) {
  return (
    <div className="w-full space-y-8">
      <h2 className="text-xl font-bold">이러닝 / 사회봉사 / 교외수업</h2>
      <table className="border- w-full border border-gray-400 bg-white">
        <thead>
          <tr className="divide-x divide-gray-400 border border-gray-400 bg-gray-50">
            {...SPECIAL_LECTURE_TABLE_HEADER.map((header) => (
              <th key={header} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full divide-y divide-gray-300">
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
            <tr className="w-full text-center">
              <td
                className="px-10 py-24"
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
  return (
    <tr
      className="h-12 cursor-pointer divide-x divide-gray-300 text-[12px] transition-colors hover:bg-gray-50"
      onClick={() => handleSpecialLecture(lecture.id)}
    >
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.campus}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.category}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.name}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.professor}</td>
      <td className="shrink-0 whitespace-nowrap p-2">{lecture.time}</td>
    </tr>
  );
}

function TimeTable() {
  const { dayStatus, searchParamsAction } = useTimeTableParams();
  const selectedSchedule =
    dayStatus === 'day' ? DAY_PERIOD_ARRAY : NIGHT_PERIOD_ARRAY;
  const { open: openLectureSearchModal } = useModalAction({
    key: MODAL_KEY.timeTable,
  });
  const { open: openLectureRemoveModal } = useModalAction({
    key: MODAL_KEY.lectureRemove,
  });
  const selectedIdList = searchParamsAction.getAll('id').map(Number);
  const { basicLectureGroup, specialLectureGroup } =
    useLectureByParams(selectedIdList);
  const [selectedLectureId, setSelectedLectureId] = useState<number>();
  const [selectedDay, setSelectedDay] = useState<DayKor>();
  const [selectedPeriod, setSelectedPeriod] = useState<
    DayPeriod | NightPeriod
  >();

  const handleTimeTableEmptyButton = ({
    period,
    idx,
  }: {
    period: string;
    idx: number;
  }) => {
    setSelectedDay(DAY_VALUE_ARRAY[idx]);
    setSelectedPeriod(period as DayPeriod | NightPeriod);
    openLectureSearchModal();
  };

  const handleTimeTableFillButton = (id: number | undefined) => {
    setSelectedLectureId(id);
    openLectureRemoveModal();
  };

  const isAddableLecture = (time: string) => {
    const commaSplitTime = time.split(',');
    let flag = true;

    commaSplitTime.forEach((parsedTime) => {
      const spaceSplitTime = parsedTime.split(' ');
      const day = spaceSplitTime.shift() as DayKor;
      const dayOrder = DAY_VALUE_ARRAY.indexOf(day);
      const range = getLectureFillRange({
        dayStatus,
        start: spaceSplitTime[0],
        end: spaceSplitTime[spaceSplitTime.length - 1],
      });

      range.forEach((period) => {
        if (basicLectureGroup[period][dayOrder].type === PERIOD_STATUS.fill) {
          flag = false;
          return;
        }
      });
    });

    return flag;
  };

  return (
    <>
      <div className="size-full space-y-16">
        <table className="w-full table-fixed border-collapse bg-white">
          <thead className="w-full">
            <tr>
              <TimeTableHeader type="COLUMN" />
              {DAY_VALUE_ARRAY.map((day) => (
                <TimeTableHeader key={day} type="ROW">
                  {day}
                </TimeTableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedSchedule.map(([period, time]) => {
              return (
                <tr key={period} className="text-center">
                  <TimeTableHeader type="COLUMN">
                    <p className="flex justify-center">
                      {period}
                      <span className="hidden sm:block">교시</span>
                    </p>
                    <p className="hidden md:block">
                      {getFormattedTime({
                        hour: time.start.hour,
                        minute: time.start.minute,
                      })}
                      ~
                      {getFormattedTime({
                        hour: time.end.hour,
                        minute: time.end.minute,
                      })}
                    </p>
                  </TimeTableHeader>
                  {basicLectureGroup[period].map(
                    ({ type, value, head }, idx) => (
                      <TimeTableItem
                        key={`${period}-${idx + 1}`}
                        bgColor={value ? LECTURE_COLOR[value.type] : null}
                      >
                        <button
                          type="button"
                          className="size-full p-2 focus:outline-0"
                          onClick={() =>
                            type === PERIOD_STATUS.empty
                              ? handleTimeTableEmptyButton({ period, idx })
                              : handleTimeTableFillButton(value?.id)
                          }
                        >
                          {value && head && (
                            <div className="flex size-full flex-col justify-between gap-y-2 break-all text-start">
                              <p className="text-base font-bold">
                                {value.name}
                              </p>
                              <div className="text-[12px] text-gray-500">
                                <p>{value.professor}</p>
                                <p>{value.room}</p>
                              </div>
                            </div>
                          )}
                        </button>
                      </TimeTableItem>
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <TimeTableSpecialLectureTable
          specialLectureGroup={specialLectureGroup}
          handleSpecialLecture={handleTimeTableFillButton}
        />
      </div>
      <TimeTableModal
        dayStatus={dayStatus}
        day={selectedDay!}
        period={selectedPeriod!}
        isAddableLecture={isAddableLecture}
      />
      <TimeTableLectureRemoveModal selectedLectureId={selectedLectureId!} />
    </>
  );
}

export default memo(TimeTable);

TimeTable.displayName = 'TimeTable';
TimeTableItem.displayName = 'TimeTableItem';
