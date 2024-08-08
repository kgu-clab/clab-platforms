'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { CloseOutline } from '@clab/icon';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import { DayKor } from '@/shared/types';
import { Modal } from '@/shared/ui';
import {
  DAY_PERIOD_ARRAY,
  DAY_STATUS,
  DayPeriod,
  DayStatus,
  GRADE,
  Grade,
  NIGHT_PERIOD_ARRAY,
  NightPeriod,
} from '@/widgets/time-table';
import { TimeTableContext } from '@/widgets/time-table/ui/TimeTableLayout';

interface TimeTableModalFilterProps<T> {
  title: string;
  list: T[];
  origin: T;
  filterItemHandler: (listVal: T) => void;
  parseFunc?: () => boolean;
}

interface TimeTableModalPeriodDropdownProps {
  dayStatus: DayStatus;
  selectedPeriod: DayPeriod[];
  dropdownItemHandler: (period: DayPeriod) => void;
}

function TimeTableModalFilter<T extends string>({
  title,
  list,
  origin,
  filterItemHandler,
  parseFunc,
}: TimeTableModalFilterProps<T>) {
  return (
    <Modal.Filter title={title}>
      {list.map((listVal) => (
        <Modal.FilterItem
          key={listVal}
          selected={!parseFunc ? origin === listVal : parseFunc()}
          onClick={() => filterItemHandler(listVal)}
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

export default function TimeTableModal() {
  const { state, action } = useContext(TimeTableContext);
  const [selectedGrade, setSelectedGrade] = useState<Grade | ''>('');
  const [selectedDay, setSelectedDay] = useState<DayKor>(state.day as DayKor);
  const [selectedPeriod, setSelectedPeriod] = useState<
    DayPeriod[] | NightPeriod[]
  >([state.period] as DayPeriod[] | NightPeriod[]);

  const filterItemHandler = useCallback(
    <T,>(targetValue: T, targetAction: Dispatch<SetStateAction<T>>) => {
      targetAction(targetValue);
    },
    [],
  );

  const periodDropdownItemHandler = useCallback(
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
    <Modal
      title="강의 검색"
      visible={state.modalVisible}
      close={action.modalCloseAction}
    >
      <Modal.Content>
        <Modal.Item title="구분" value={DAY_STATUS[state.dayStatus]} />
        <TimeTableModalFilter
          title="학년 선택"
          list={[...GRADE] as Grade[]}
          origin={selectedGrade}
          filterItemHandler={(grade) =>
            filterItemHandler(grade, setSelectedGrade)
          }
        />
        <TimeTableModalFilter
          title="요일 선택"
          list={DAY_VALUE_ARRAY}
          origin={selectedDay}
          filterItemHandler={(day) => filterItemHandler(day, setSelectedDay)}
        />
        <TimeTableModalPeriodDropdown
          selectedPeriod={selectedPeriod}
          dayStatus={state.dayStatus}
          dropdownItemHandler={periodDropdownItemHandler}
        />
      </Modal.Content>
    </Modal>
  );
}
