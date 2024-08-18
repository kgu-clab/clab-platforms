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

import { Input } from '@clab-platforms/design-system';
import { CloseOutline } from '@clab-platforms/icon';

import { DAY_VALUE_ARRAY, MODAL_KEY } from '@/shared/constants';
import {
  useDebounce,
  useModalAction,
  useModalState,
  useOutsideClick,
} from '@/shared/hooks';
import type { DayKor } from '@/shared/types';
import { Modal } from '@/shared/ui';
import {
  DayCampus,
  DayPeriod,
  DayStatus,
  Grade,
  LectureKey,
  NightCampus,
  NightPeriod,
  Region,
  SpecialPeriod,
} from '@/widgets/time-table';
import {
  DAY_PERIOD_ARRAY,
  DAY_STATUS,
  GRADE,
  LECTURE,
  LECTURE_ARRAY,
  NIGHT_PERIOD_ARRAY,
  REGION,
  REGION_VALUE_ARRAY,
  SPECIAL_PERIOD,
  TimeTableLectureTable,
  useMajorList,
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

interface TimeTableModalMajorInputProps {
  selectedMajor: string[];
  handleMajorInputChange: (major: string) => void;
}

interface TimeTableModalLectureSearchInputProps {
  handleLectureSearchInputChange: (keyword: string) => void;
}

interface TimeTableModalProps<T> {
  dayStatus: DayStatus;
  day: DayKor;
  period: T;
}

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
    DAY_STATUS[dayStatus] === DAY_STATUS.day
      ? DAY_PERIOD_ARRAY
      : NIGHT_PERIOD_ARRAY;
  const selectedValue = (
    <>
      {selectedPeriod.length ? (
        <div className="flex max-w-full flex-wrap gap-1">
          {selectedPeriod.map((period) => (
            <TimeTableModalDropdownButton
              key={`dropdown-item-${period}`}
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

const TimeTableModalMajorInput = memo(function TimeTableModalMajorInput({
  selectedMajor,
  handleMajorInputChange,
}: TimeTableModalMajorInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const debouncedValue = useDebounce({
    value: inputValue,
    delay: 1000,
  }) as string;
  const findMajorList = useMajorList({ major: debouncedValue });
  const ref = useOutsideClick({ callback: () => setOpen(false) });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const selectedValue = (
    <div className="flex max-w-full flex-wrap gap-1">
      {...selectedMajor.map((major) => (
        <TimeTableModalDropdownButton
          key={major}
          onClick={() => handleMajorInputChange(major)}
          value={major}
        />
      ))}
    </div>
  );

  return (
    <Modal.Item title="전공 선택">
      <div className="relative" ref={ref}>
        <div
          className="flex w-full flex-wrap gap-y-1 rounded-md border border-gray-400 p-1 text-sm"
          onClick={() => setOpen(true)}
        >
          {selectedMajor && selectedValue}
          <div className="grow">
            <input
              className="w-full px-1 py-0.5 text-gray-600 focus:outline-0"
              value={inputValue}
              placeholder="전공을 입력해주세요"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        {findMajorList.length > 0 && open && (
          <div className="absolute z-40 mt-4 max-h-60 min-h-fit w-full overflow-hidden overflow-y-scroll rounded-md border border-gray-400 bg-white p-2 drop-shadow-md">
            {...findMajorList.map((major) => (
              <Modal.DropdownItem
                key={major}
                onClick={() => handleMajorInputChange(major)}
                selected={selectedMajor.includes(major)}
              >
                {major}
              </Modal.DropdownItem>
            ))}
          </div>
        )}
      </div>
    </Modal.Item>
  );
});

const TimeTableLectureSearchInput = memo(function TimeTableLectureSearchInput({
  handleLectureSearchInputChange,
}: TimeTableModalLectureSearchInputProps) {
  return (
    <Modal.Item title="강의 검색">
      <Input
        inputClassName="border-gray-400 px-1 px-1.5 rounded-md"
        placeholder="강의명을 입력해주세요"
        onChange={(event) =>
          handleLectureSearchInputChange(event.currentTarget.value)
        }
      />
    </Modal.Item>
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
  const [selectedMajor, setSelectedMajor] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const debouncedSearchKeyword = useDebounce({
    value: searchKeyword,
    delay: 1000,
  });

  useEffect(() => {
    setSelectedGrade([]);
    setSelectedRegion([REGION.campus1, REGION.campus2]);
    setSelectedDay([day]);
    setSelectedPeriod([period]);
    setSelectedLectureType([]);
    setSelectedMajor([]);
    setSearchKeyword('');
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
              handleFilterItem={(region) =>
                handleFilterItem(region, selectedRegion, setSelectedRegion)
              }
            />
            <TimeTableModalFilter
              title="학년 선택"
              list={[...GRADE] as Grade[]}
              origin={selectedGrade}
              handleFilterItem={(grade) =>
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
            <TimeTableModalMajorInput
              selectedMajor={selectedMajor}
              handleMajorInputChange={(major) =>
                handleFilterItem(major, selectedMajor, setSelectedMajor)
              }
            />
            <TimeTableLectureSearchInput
              handleLectureSearchInputChange={(keyword) =>
                setSearchKeyword(keyword)
              }
            />
            <TimeTableLectureTable
              selectedValues={{
                campus: selectedRegion.map(
                  (region) =>
                    `${region}${DAY_STATUS[dayStatus]}` as
                      | DayCampus
                      | NightCampus,
                ),
                type: selectedLectureType,
                grade: selectedGrade,
                day: selectedDay,
                time: selectedPeriod,
                major: selectedMajor,
                lectureName: debouncedSearchKeyword,
                cursor: 0,
                limit: 10,
              }}
            />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
