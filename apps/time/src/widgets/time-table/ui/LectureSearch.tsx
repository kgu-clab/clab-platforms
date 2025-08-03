'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import { CloseOutline } from '@clab-platforms/icon';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import { useDebounce, useOutsideClick } from '@/shared/hooks';
import type { DayKor } from '@/shared/types';
import * as model from '@/widgets/time-table/model';
import type * as types from '@/widgets/time-table/types';
import { TimeTableLectureTable } from '@/widgets/time-table/ui';

interface LectureSearchFilterProps<T> {
  title: string;
  list: T[];
  origin: T[];
  handleFilterItem: (listVal: T) => void;
  parseFunc?: () => boolean;
}

interface LectureSearchPeriodDropdownProps<T> {
  dayStatus: types.DayStatus;
  selectedPeriod: T[];
  handlePeriodDropdownItem: (period: T) => void;
}

interface LectureSearchLectureTypeDropdownProps {
  selectedLectureType: types.LectureKey[];
  handleLectureTypeDropdownItem: (lecture: types.LectureKey) => void;
}

interface LectureSearchDropdownButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
}

interface LectureSearchMajorInputProps {
  selectedMajor: string[];
  handleMajorInputChange: (major: string) => void;
}

interface LectureSearchLectureSearchInputProps {
  handleLectureSearchInputChange: (keyword: string) => void;
}

function LectureSearchFilter<T extends string>({
  title,
  list,
  origin,
  handleFilterItem,
}: LectureSearchFilterProps<T>) {
  const originSet = new Set(origin);

  return (
    <div className="flex w-fit shrink-0 flex-nowrap items-center gap-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="border-time-table-border divide-time-table-border flex flex-nowrap divide-x overflow-hidden rounded-md border">
        {list.map((listVal) => (
          <button
            key={listVal}
            type="button"
            className={`px-3 py-1 text-sm transition-colors hover:bg-gray-300/20 ${originSet.has(listVal) ? 'bg-time-table-header' : 'bg-white text-gray-700'}`}
            onClick={() => handleFilterItem(listVal)}
          >
            {listVal}
          </button>
        ))}
      </div>
    </div>
  );
}

const LectureSearchPeriodDropdown = memo(function LectureSearchPeriodDropdown<
  T extends types.DayPeriod | types.NightPeriod,
>({
  dayStatus,
  selectedPeriod,
  handlePeriodDropdownItem,
}: LectureSearchPeriodDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const periodList =
    model.DAY_STATUS[dayStatus] === model.DAY_STATUS.day
      ? model.DAY_PERIOD_ARRAY
      : model.NIGHT_PERIOD_ARRAY;
  const selectedValue = (
    <>
      {selectedPeriod.length ? (
        <div className="flex max-w-full flex-wrap gap-1">
          {selectedPeriod.map((period) => (
            <LectureSearchDropdownButton
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
        <p className="select-none px-1 py-0.5 text-gray-700">
          시간을 선택하세요
        </p>
      )}
    </>
  );

  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-medium text-gray-700">시간 선택</h3>
      <div className="relative">
        <div
          className="flex min-h-[40px] w-full cursor-pointer items-center justify-between rounded-md border border-gray-400 bg-white px-3 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1">{selectedValue}</div>
          <svg
            className={`size-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-40 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
            {periodList.map(([period, obj]) => (
              <button
                key={`dropdown-${period}`}
                type="button"
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                  selectedPeriod.includes(period as T)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  handlePeriodDropdownItem(period as T);
                  setIsOpen(false);
                }}
              >
                {`${period} (${obj.string})`}
              </button>
            ))}
            {model.SPECIAL_PERIOD.map((period) => (
              <button
                key={`dropdown-${period}`}
                type="button"
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                  selectedPeriod.includes(period as T)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  handlePeriodDropdownItem(period as T);
                  setIsOpen(false);
                }}
              >
                {period}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

const LectureSearchLectureTypeDropdown = memo(
  function LectureSearchLectureTypeDropdown({
    selectedLectureType,
    handleLectureTypeDropdownItem,
  }: LectureSearchLectureTypeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedValue = (
      <>
        {selectedLectureType.length ? (
          <div className="flex max-w-full flex-wrap gap-1">
            {selectedLectureType.map((lectureType) => (
              <LectureSearchDropdownButton
                key={`dropdown-button-${lectureType}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleLectureTypeDropdownItem(lectureType);
                }}
                value={model.LECTURE[lectureType]}
              />
            ))}
          </div>
        ) : (
          <p className="select-none text-sm font-normal text-gray-500">
            강의 구분을 선택하세요
          </p>
        )}
      </>
    );

    return (
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-700">강의 구분</h3>
        <div className="relative">
          <div
            className="flex min-h-[40px] w-full cursor-pointer items-center justify-between rounded-md border border-gray-400 bg-white px-3 py-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex-1">{selectedValue}</div>
            <svg
              className={`size-4 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isOpen && (
            <div className="absolute z-40 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
              {model.LECTURE_ARRAY.map(([lectureKey, lectureValue]) => (
                <button
                  key={`dropdown-${lectureKey}`}
                  type="button"
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                    selectedLectureType.includes(lectureKey)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                  onClick={() => {
                    handleLectureTypeDropdownItem(lectureKey);
                    setIsOpen(false);
                  }}
                >
                  {lectureValue}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

const LectureSearchDropdownButton = memo(function LectureSearchDropdownButton({
  onClick,
  value,
}: LectureSearchDropdownButtonProps) {
  return (
    <button
      type="button"
      className="flex min-w-12 items-center justify-between gap-x-1 rounded-md bg-gray-100 px-1.5 py-0 text-sm text-gray-700 hover:bg-gray-200"
      onClick={onClick}
    >
      <p>{value}</p>
      <CloseOutline width={16} height={16} />
    </button>
  );
});

const LectureSearchMajorInput = memo(function LectureSearchMajorInput({
  selectedMajor,
  handleMajorInputChange,
}: LectureSearchMajorInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const debouncedValue = useDebounce({
    value: inputValue,
    delay: 1000,
  });
  const findMajorList = model.useMajorList({ major: debouncedValue });
  const ref = useOutsideClick({ callback: () => setOpen(false) });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const selectedValue = (
    <div className="flex max-w-full flex-wrap gap-1">
      {selectedMajor.map((major) => (
        <LectureSearchDropdownButton
          key={major}
          onClick={() => handleMajorInputChange(major)}
          value={major}
        />
      ))}
    </div>
  );

  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-medium text-gray-700">전공 선택</h3>
      <div className="relative" ref={ref}>
        <div
          className="flex w-full flex-wrap gap-1 rounded-md border border-gray-400 bg-white p-2 text-sm"
          onClick={() => setOpen(true)}
        >
          {selectedMajor && selectedValue}
          <div className="flex grow items-center">
            <input
              className="w-full placeholder:text-gray-500 focus:outline-0"
              value={inputValue}
              placeholder="전공을 입력해주세요"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        {findMajorList.length > 0 && open && (
          <div className="absolute z-40 mt-4 max-h-60 min-h-fit w-full overflow-hidden overflow-y-scroll rounded-md border border-gray-400 bg-white p-2 drop-shadow-md">
            {findMajorList.map((major) => (
              <button
                key={major}
                type="button"
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                  selectedMajor.includes(major)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  handleMajorInputChange(major);
                  setInputValue('');
                }}
              >
                {major}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

const LectureSearchLectureSearchInput = memo(
  function LectureSearchLectureSearchInput({
    handleLectureSearchInputChange,
  }: LectureSearchLectureSearchInputProps) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.currentTarget.value);
      handleLectureSearchInputChange(event.currentTarget.value);
    };

    return (
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-700">강의 검색</h3>
        <input
          className="flex w-full flex-wrap gap-1 rounded-md border border-gray-400 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-0"
          value={inputValue}
          placeholder="강의명을 입력해주세요"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    );
  },
);

export default function TimeTableLectureFinder() {
  const defaultDayStatus: types.DayStatus = 'day';
  const defaultDay: DayKor = '월';
  const defaultPeriod: types.DayPeriod = '1';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultIsAddableLecture = (time: string) => true;

  const [selectedRegion, setSelectedRegion] = useState<types.Region[]>([
    model.REGION.campus1,
    model.REGION.campus2,
  ]);
  const [selectedGrade, setSelectedGrade] = useState<types.Grade[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayKor[]>([defaultDay]);
  const [selectedPeriod, setSelectedPeriod] = useState<
    types.DayPeriod[] | types.NightPeriod[]
  >([defaultPeriod]);
  const [selectedLectureType, setSelectedLectureType] = useState<
    types.LectureKey[]
  >([]);
  const [selectedMajor, setSelectedMajor] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const debouncedSearchKeyword = useDebounce({
    value: searchKeyword,
    delay: 1000,
  });

  useEffect(() => {
    setSelectedGrade([]);
    setSelectedRegion([model.REGION.campus1, model.REGION.campus2]);
    setSelectedDay([defaultDay]);
    setSelectedPeriod([defaultPeriod]);
    setSelectedLectureType([]);
    setSearchKeyword('');
  }, [defaultDay, defaultPeriod]);

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
    (value: types.DayPeriod | types.NightPeriod) => {
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
    <div className="space-y-4">
      <div className="w-7/8 flex flex-wrap gap-4">
        <LectureSearchFilter
          title="캠퍼스"
          list={model.REGION_VALUE_ARRAY.map((str) => str)}
          origin={selectedRegion}
          handleFilterItem={(region) =>
            handleFilterItem(region, selectedRegion, setSelectedRegion)
          }
        />
        <LectureSearchFilter
          title="학년 선택"
          list={[...Object.keys(model.GRADE)] as types.Grade[]}
          origin={selectedGrade}
          handleFilterItem={(grade) =>
            handleFilterItem(grade, selectedGrade, setSelectedGrade)
          }
        />
        <LectureSearchFilter
          title="요일 선택"
          list={DAY_VALUE_ARRAY.map((str) => str) as DayKor[]}
          origin={selectedDay}
          handleFilterItem={(day) =>
            handleFilterItem(day, selectedDay, setSelectedDay)
          }
        />
      </div>

      <LectureSearchPeriodDropdown
        selectedPeriod={selectedPeriod}
        dayStatus={defaultDayStatus}
        handlePeriodDropdownItem={handlePeriodDropdownItem}
      />
      <LectureSearchLectureTypeDropdown
        selectedLectureType={selectedLectureType}
        handleLectureTypeDropdownItem={(lecture: types.LectureKey) =>
          handleFilterItem(lecture, selectedLectureType, setSelectedLectureType)
        }
      />
      <LectureSearchMajorInput
        selectedMajor={selectedMajor}
        handleMajorInputChange={(major) =>
          handleFilterItem(major, selectedMajor, setSelectedMajor)
        }
      />
      <LectureSearchLectureSearchInput
        handleLectureSearchInputChange={(keyword) => setSearchKeyword(keyword)}
      />
      <TimeTableLectureTable
        isAddableLecture={defaultIsAddableLecture}
        selectedValues={{
          campus: selectedRegion.map(
            (region) =>
              `${region}${model.DAY_STATUS[defaultDayStatus]}` as
                | types.DayCampus
                | types.NightCampus,
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
    </div>
  );
}
