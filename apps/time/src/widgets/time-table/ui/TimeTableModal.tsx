'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import { DayKor } from '@/shared/types';
import { Modal } from '@/shared/ui';
import { Grade } from '@/widgets/time-table';
import GRADE from '@/widgets/time-table/model/constants/grade';
import { TimeTableContext } from '@/widgets/time-table/ui/TimeTableLayout';

interface TimeTableModalFilterProps<T> {
  title: string;
  list: T[];
  origin: T;
  filterItemHandler: (listVal: T) => void;
}

function TimeTableModalFilter<T>({
  title,
  list,
  origin,
  filterItemHandler,
}: TimeTableModalFilterProps<T>) {
  return (
    <Modal.Filter title={title}>
      {list.map((listVal) => (
        <Modal.FilterItem
          key={listVal as string}
          selected={origin === listVal}
          onClick={() => filterItemHandler(listVal)}
        >
          {listVal as string}
        </Modal.FilterItem>
      ))}
    </Modal.Filter>
  );
}

// Period의 경우에는 DropDown 처리할 것
export default function TimeTableModal() {
  const { state, action } = useContext(TimeTableContext);
  const [selectedGrade, setSelectedGrade] = useState<Grade>();
  const [selectedDay, setSelectedDay] = useState<DayKor>(state.day as DayKor);
  // const [selectedPeriod, setSelectedPeriod] = useState<DayPeriod | NightPeriod>(
  //   state.period as DayPeriod | NightPeriod,
  // );

  const filterItemHandler = useCallback(
    <T,>(targetValue: T, targetAction: Dispatch<SetStateAction<T>>) => {
      targetAction(targetValue);
    },
    [],
  );

  return (
    <Modal
      title="강의 검색"
      visible={state.modalVisible}
      close={action.modalCloseAction}
    >
      <div className="space-y-2">
        <TimeTableModalFilter
          title="학년 선택"
          list={[...GRADE]}
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
      </div>
    </Modal>
  );
}
