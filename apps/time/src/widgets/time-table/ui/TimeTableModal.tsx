'use client';

import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Input } from '@clab/design-system';
import { CloseOutline } from '@clab/icon';

import { DAY_VALUE_ARRAY, MODAL_KEY } from '@/shared/constants';
import { useModalAction, useModalState } from '@/shared/hooks';
import type { DayKor } from '@/shared/types';
import { Modal } from '@/shared/ui';
import {
  DayPeriod,
  DayStatus,
  Grade,
  LectureKey,
  NightPeriod,
  Region,
  SPECIAL_PERIOD,
  SpecialPeriod,
} from '@/widgets/time-table';
import {
  DAY_PERIOD_ARRAY,
  GRADE,
  LECTURE,
  LECTURE_ARRAY,
  NIGHT_PERIOD_ARRAY,
  REGION,
  REGION_VALUE_ARRAY,
} from '@/widgets/time-table';

interface TimeTableModalFilterProps<T> {
  title: string;
  list: T[];
  origin: T[];
  handleFilterItem: (listVal: T) => void;
  parseFunc?: () => boolean;
}

interface TimeTableModalPeriodDropdownProps<T> {
  dayStatus: DayStatus;
  selectedPeriod: T[];
  handlePeriodDropdownItem: (period: T) => void;
}

interface TimeTableModalLectureTypeDropdownProps {
  selectedLectureType: LectureKey[];
  handleLectureTypeDropdownItem: (lecture: LectureKey) => void;
}

interface TimeTableModalDropdownButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
}

interface TimeTableLectureTableProps {
  lectureList: unknown[];
}

interface TimeTableModalProps<T> {
  dayStatus: DayStatus;
  day: DayKor;
  period: T;
}

const LECTURE_TABLE_ROW_HEADER = [
  '과목코드',
  '캠퍼스',
  '카테고리',
  '학점',
  '학년',
  '전공',
  '수업명',
  '담당교수',
  '학기',
  '시간',
  '수업구분',
  '초과여부',
] as const;

function TimeTableModalFilter<T extends string>({
  title,
  list,
  origin,
  handleFilterItem,
  parseFunc,
}: TimeTableModalFilterProps<T>) {
  const originSet = new Set(origin);

  return (
    <Modal.Filter title={title}>
      {list.map((listVal) => (
        <Modal.FilterItem
          key={listVal}
          selected={!parseFunc ? originSet.has(listVal) : parseFunc()}
          onClick={() => handleFilterItem(listVal)}
        >
          {listVal}
        </Modal.FilterItem>
      ))}
    </Modal.Filter>
  );
}

const TimeTableModalPeriodDropdown = memo(function TimeTableModalPeriodDropdown<
  T extends DayPeriod | NightPeriod,
>({
  dayStatus,
  selectedPeriod,
  handlePeriodDropdownItem,
}: TimeTableModalPeriodDropdownProps<T>) {
  const periodList =
    dayStatus === 'day' ? DAY_PERIOD_ARRAY : NIGHT_PERIOD_ARRAY;
  const selectedValue = (
    <>
      {selectedPeriod.length ? (
        <div className="flex max-w-full flex-wrap gap-1">
          {selectedPeriod.map((period) => (
            <TimeTableModalDropdownButton
              key={period}
              onClick={(event) => {
                event.stopPropagation();
                handlePeriodDropdownItem(period);
              }}
              value={period}
            />
          ))}
        </div>
      ) : (
        <p className="select-none px-1 py-0.5">시간을 선택하세요</p>
      )}
    </>
  );

  return (
    <Modal.Dropdown title="시간 선택" value={selectedValue}>
      {periodList.map(([period, obj]) => (
        <Modal.DropdownItem
          key={`dropdown-${period}`}
          selected={selectedPeriod.includes(period as T)}
          onClick={() => handlePeriodDropdownItem(period as T)}
        >{`${period} (${obj.string})`}</Modal.DropdownItem>
      ))}
      {SPECIAL_PERIOD.map((period) => (
        <Modal.DropdownItem
          key={`dropdown-${period}`}
          selected={selectedPeriod.includes(period as T)}
          onClick={() => handlePeriodDropdownItem(period as T)}
        >
          {period}
        </Modal.DropdownItem>
      ))}
    </Modal.Dropdown>
  );
});

const TimeTableModalLectureTypeDropdown = memo(
  function TimeTableModalLectureTypeDropdown({
    selectedLectureType,
    handleLectureTypeDropdownItem,
  }: TimeTableModalLectureTypeDropdownProps) {
    const selectedValue = (
      <>
        {selectedLectureType.length ? (
          <div className="flex max-w-full flex-wrap gap-1">
            {selectedLectureType.map((lectureType) => (
              <TimeTableModalDropdownButton
                key={`dropdown-button-${lectureType}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleLectureTypeDropdownItem(lectureType);
                }}
                value={LECTURE[lectureType]}
              />
            ))}
          </div>
        ) : (
          <p className="select-none px-1 py-0.5">강의 구분을 선택하세요</p>
        )}
      </>
    );

    return (
      <Modal.Dropdown title="강의 구분" value={selectedValue}>
        {LECTURE_ARRAY.map(([lectureKey, lectureValue]) => (
          <Modal.DropdownItem
            key={`dropdown-${lectureKey}`}
            selected={selectedLectureType.includes(lectureKey)}
            onClick={() => handleLectureTypeDropdownItem(lectureKey)}
          >
            {lectureValue}
          </Modal.DropdownItem>
        ))}
      </Modal.Dropdown>
    );
  },
);

const TimeTableModalDropdownButton = memo(
  function TimeTableModalDropdownButton({
    onClick,
    value,
  }: TimeTableModalDropdownButtonProps) {
    return (
      <button
        type="button"
        className="flex min-w-12 items-center justify-between gap-x-1 rounded-md bg-gray-100 px-1.5 py-0.5 text-sm text-gray-500"
        onClick={onClick}
      >
        <p>{value}</p>
        <CloseOutline width={16} height={16} />
      </button>
    );
  },
);

const TimeTableModalInput = memo(function TimeTableModalInput() {
  return (
    <Modal.Item title="강의 찾기">
      <Input inputClassName="border-gray-400 rounded-md py-1" />
    </Modal.Item>
  );
});

const TimeTableLectureTable = memo(function TimeTableLectureTable({
  lectureList,
}: TimeTableLectureTableProps) {
  return (
    <div className="mt-3">
      <table className="w-full table-auto border-collapse border border-gray-400 text-sm">
        <thead className="w-full border border-gray-400 text-center">
          <tr className="divide-x divide-gray-400 border border-gray-400 bg-gray-100">
            {LECTURE_TABLE_ROW_HEADER.map((header) => (
              <td className="py-2" key={header}>
                {header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="h-80 w-full">
          <tr>
            <td
              className="text-center"
              colSpan={LECTURE_TABLE_ROW_HEADER.length}
            >
              {lectureList.length ? (
                <p>검색 결과가 없습니다.</p>
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default function TimeTableModal<
  T extends DayPeriod | NightPeriod | SpecialPeriod,
>({ dayStatus, day, period }: TimeTableModalProps<T>) {
  const { close } = useModalAction({ key: MODAL_KEY.timeTable });
  const visible = useModalState({ key: MODAL_KEY.timeTable }).visible;
  const [selectedRegion, setSelectedRegion] = useState<Region[]>([
    REGION.campus1,
    REGION.campus2,
  ]);
  const [selectedGrade, setSelectedGrade] = useState<Grade[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayKor[]>([day]);
  const [selectedPeriod, setSelectedPeriod] = useState<
    DayPeriod[] | NightPeriod[]
  >([period]);
  const [selectedLectureType, setSelectedLectureType] = useState<LectureKey[]>(
    [],
  );

  useEffect(() => {
    setSelectedGrade([]);
    setSelectedRegion([REGION.campus1, REGION.campus2]);
    setSelectedDay([day]);
    setSelectedPeriod([period]);
    setSelectedLectureType([]);
  }, [day, period]);

  const handleFilterItem = useCallback(
    <T,>(
      targetValue: T,
      targetList: T[],
      targetAction: Dispatch<SetStateAction<T[]>>,
    ) => {
      const targetSet = new Set(targetList);

      if (targetSet.has(targetValue)) {
        targetSet.delete(targetValue);
      } else {
        targetSet.add(targetValue);
      }

      targetAction(() => Array.from(targetSet));
    },
    [],
  );

  const handlePeriodDropdownItem = useCallback(
    (value: DayPeriod | NightPeriod) => {
      setSelectedPeriod((prev) => {
        const periodSet = new Set(prev);

        if (periodSet.has(value)) {
          periodSet.delete(value);
        } else {
          periodSet.add(value);
        }

        return Array.from(periodSet).sort();
      });
    },
    [setSelectedPeriod],
  );

  return (
    <>
      {visible && (
        <Modal title="강의 검색" close={close}>
          <Modal.Content>
            <TimeTableModalFilter
              title="구분"
              list={REGION_VALUE_ARRAY.map((str) => str)}
              origin={selectedRegion}
              handleFilterItem={(region: Region) =>
                handleFilterItem(region, selectedRegion, setSelectedRegion)
              }
            />
            <TimeTableModalFilter
              title="학년 선택"
              list={[...GRADE] as Grade[]}
              origin={selectedGrade}
              handleFilterItem={(grade: Grade) =>
                handleFilterItem(grade, selectedGrade, setSelectedGrade)
              }
            />
            <TimeTableModalFilter
              title="요일 선택"
              list={DAY_VALUE_ARRAY}
              origin={selectedDay}
              handleFilterItem={(day) =>
                handleFilterItem(day, selectedDay, setSelectedDay)
              }
            />
            <TimeTableModalPeriodDropdown
              selectedPeriod={selectedPeriod}
              dayStatus={dayStatus}
              handlePeriodDropdownItem={handlePeriodDropdownItem}
            />
            <TimeTableModalLectureTypeDropdown
              selectedLectureType={selectedLectureType}
              handleLectureTypeDropdownItem={(lecture: LectureKey) =>
                handleFilterItem(
                  lecture,
                  selectedLectureType,
                  setSelectedLectureType,
                )
              }
            />
            <TimeTableModalInput />
            <TimeTableLectureTable lectureList={[]} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
