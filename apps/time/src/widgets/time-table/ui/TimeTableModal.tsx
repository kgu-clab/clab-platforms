'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CloseOutline } from '@clab-platforms/icon';

import { DAY_VALUE_ARRAY, MODAL_KEY } from '@/shared/constants';
import { useModalAction, useModalState } from '@/shared/hooks';
import type { DayKor } from '@/shared/types';
import { Modal } from '@/shared/ui';
import {
  DAY_PERIOD_ARRAY,
  DAY_STATUS,
  type DayPeriod,
  type DayStatus,
  GRADE,
  type Grade,
  NIGHT_PERIOD_ARRAY,
  type NightPeriod,
} from '@/widgets/time-table';

interface TimeTableModalFilterProps<T> {
  title: string;
  list: T[];
  origin: T;
  handleFilterItem: (listVal: T) => void;
  parseFunc?: () => boolean;
}

interface TimeTableModalPeriodDropdownProps {
  dayStatus: DayStatus;
  selectedPeriod: DayPeriod[];
  dropdownItemHandler: (period: DayPeriod) => void;
}

interface TimeTableModalProps {
  dayStatus: DayStatus;
  day: DayKor;
  period: DayPeriod | NightPeriod;
}

function TimeTableModalFilter<T extends string>({
  title,
  list,
  origin,
  handleFilterItem,
  parseFunc,
}: TimeTableModalFilterProps<T>) {
  return (
    <Modal.Filter title={title}>
      {list.map((listVal) => (
        <Modal.FilterItem
          key={listVal}
          selected={!parseFunc ? origin === listVal : parseFunc()}
          onClick={() => handleFilterItem(listVal)}
        >
          {listVal}
        </Modal.FilterItem>
      ))}
    </Modal.Filter>
  );
}

function TimeTableModalPeriodDropdown({
  dayStatus,
  selectedPeriod,
  dropdownItemHandler,
}: TimeTableModalPeriodDropdownProps) {
  const periodList =
    dayStatus === 'day' ? DAY_PERIOD_ARRAY : NIGHT_PERIOD_ARRAY;
  const selectedValue = (
    <div className="flex max-w-full flex-wrap gap-1">
      {selectedPeriod.map((period) => (
        <button
          key={period}
          type="button"
          className="flex min-w-12 items-center justify-between rounded-md bg-gray-100 px-1.5 py-0.5 text-sm text-gray-500"
          onClick={(event) => {
            event.stopPropagation();
            dropdownItemHandler(period);
          }}
        >
          <p>{period}</p>
          <CloseOutline width={16} height={16} />
        </button>
      ))}
    </div>
  );

  return (
    <Modal.Dropdown
      title="시간 선택"
      value={selectedPeriod.length ? selectedValue : '시간을 선택하세요'}
    >
      {periodList.map(([period, obj]) => (
        <Modal.DropdownItem
          key={period}
          selected={selectedPeriod.includes(period as DayPeriod | NightPeriod)}
          onClick={() => dropdownItemHandler(period as DayPeriod | NightPeriod)}
        >{`${period} (${obj.string})`}</Modal.DropdownItem>
      ))}
    </Modal.Dropdown>
  );
}

export default function TimeTableModal({
  dayStatus,
  day,
  period,
}: TimeTableModalProps) {
  const { close } = useModalAction({ key: MODAL_KEY.timeTable });
  const visible = useModalState({ key: MODAL_KEY.timeTable }).visible;
  const [selectedGrade, setSelectedGrade] = useState<Grade | ''>('');
  const [selectedDay, setSelectedDay] = useState<DayKor>(day);
  const [selectedPeriod, setSelectedPeriod] = useState<
    DayPeriod[] | NightPeriod[]
  >([period]);

  useEffect(() => {
    setSelectedGrade('');
    setSelectedDay(day as DayKor);
    setSelectedPeriod([period]);
  }, [day, period]);

  const handleFilterItem = useCallback(
    <T,>(targetValue: T, targetAction: Dispatch<SetStateAction<T>>) => {
      targetAction(targetValue);
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
            <Modal.Item title="구분" value={DAY_STATUS[dayStatus]} />
            <TimeTableModalFilter
              title="학년 선택"
              list={[...GRADE] as Grade[]}
              origin={selectedGrade}
              handleFilterItem={(grade) =>
                handleFilterItem(grade, setSelectedGrade)
              }
            />
            <TimeTableModalFilter
              title="요일 선택"
              list={DAY_VALUE_ARRAY}
              origin={selectedDay}
              handleFilterItem={(day) => handleFilterItem(day, setSelectedDay)}
            />
            <TimeTableModalPeriodDropdown
              selectedPeriod={selectedPeriod}
              dayStatus={dayStatus}
              dropdownItemHandler={handlePeriodDropdownItem}
            />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
