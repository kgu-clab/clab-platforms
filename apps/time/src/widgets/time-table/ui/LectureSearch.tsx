'use client';

import { memo, useCallback, useMemo, useState } from 'react';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import { useDebounce, useOutsideClick } from '@/shared/hooks';
import * as model from '@/widgets/time-table/model';
import type * as types from '@/widgets/time-table/types';
import { LectureSearchItem, LectureSearchTable } from '@/widgets/time-table/ui';

interface LectureSearchPeriodDropdownProps {
  dayStatus: types.DayStatus;
  selectedPeriod: (types.DayPeriod | types.NightPeriod)[];
  onPeriodToggle: (period: types.DayPeriod | types.NightPeriod) => void;
}

const LectureSearchPeriodDropdown = memo<LectureSearchPeriodDropdownProps>(
  ({ dayStatus, selectedPeriod, onPeriodToggle }) => {
    const [isOpen, setIsOpen] = useState(false);

    const periodList = useMemo(
      () =>
        model.DAY_STATUS[dayStatus] === model.DAY_STATUS.day
          ? model.DAY_PERIOD_ARRAY
          : model.NIGHT_PERIOD_ARRAY,
      [dayStatus],
    );

    const selectedItems = useMemo(
      () =>
        selectedPeriod.length ? (
          <div className="flex max-w-full flex-wrap gap-1">
            {selectedPeriod.map((period) => (
              <LectureSearchItem.RemovableTag
                key={`period-${period}`}
                value={period}
                onRemove={() => {
                  onPeriodToggle(period);
                }}
              />
            ))}
          </div>
        ) : (
          <p className="select-none p-0 text-sm text-gray-500">
            시간을 선택하세요
          </p>
        ),
      [selectedPeriod, onPeriodToggle],
    );

    const dropdownContent = useMemo(
      () => (
        <>
          {periodList.map(([period, obj]) => (
            <LectureSearchItem.DropdownButton
              key={`dropdown-${period}`}
              isSelected={selectedPeriod.includes(
                period as types.DayPeriod | types.NightPeriod,
              )}
              onClick={() => {
                onPeriodToggle(period as types.DayPeriod | types.NightPeriod);
                setIsOpen(false);
              }}
            >
              {`${period} (${obj.string})`}
            </LectureSearchItem.DropdownButton>
          ))}
          {model.SPECIAL_PERIOD.map((period) => (
            <LectureSearchItem.DropdownButton
              key={`special-${period}`}
              isSelected={selectedPeriod.includes(
                period as types.DayPeriod | types.NightPeriod,
              )}
              onClick={() => {
                onPeriodToggle(period as types.DayPeriod | types.NightPeriod);
                setIsOpen(false);
              }}
            >
              {period}
            </LectureSearchItem.DropdownButton>
          ))}
        </>
      ),
      [periodList, selectedPeriod, onPeriodToggle],
    );

    return (
      <LectureSearchItem.Dropdown
        title="시간 선택"
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        selectedItems={selectedItems}
      >
        {dropdownContent}
      </LectureSearchItem.Dropdown>
    );
  },
);

LectureSearchPeriodDropdown.displayName = 'LectureSearchPeriodDropdown';

const LectureSearchLectureTypeDropdown = memo(() => {
  const { selectedLectureType, toggleLectureType } = model.useLectureFilters();
  const [isOpen, setIsOpen] = useState(false);

  const selectedItems = useMemo(
    () =>
      selectedLectureType.length ? (
        <div className="flex max-w-full flex-wrap gap-1">
          {selectedLectureType.map((lectureType) => (
            <LectureSearchItem.RemovableTag
              key={`lecture-${lectureType}`}
              value={model.LECTURE[lectureType]}
              onRemove={() => {
                toggleLectureType(lectureType);
              }}
            />
          ))}
        </div>
      ) : (
        <p className="select-none text-sm font-normal text-gray-500">
          강의 구분을 선택하세요
        </p>
      ),
    [selectedLectureType, toggleLectureType],
  );

  const dropdownContent = useMemo(
    () => (
      <>
        {model.LECTURE_ARRAY.map(([lectureKey, lectureValue]) => (
          <LectureSearchItem.DropdownButton
            key={`lecture-dropdown-${lectureKey}`}
            isSelected={selectedLectureType.includes(lectureKey)}
            onClick={() => {
              toggleLectureType(lectureKey);
              setIsOpen(false);
            }}
          >
            {lectureValue}
          </LectureSearchItem.DropdownButton>
        ))}
      </>
    ),
    [selectedLectureType, toggleLectureType],
  );

  return (
    <LectureSearchItem.Dropdown
      title="강의 구분"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      selectedItems={selectedItems}
    >
      {dropdownContent}
    </LectureSearchItem.Dropdown>
  );
});

LectureSearchLectureTypeDropdown.displayName =
  'LectureSearchLectureTypeDropdown';

const LectureMajorInput = memo(() => {
  const { selectedMajor, toggleMajor } = model.useLectureFilters();

  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedValue = useDebounce({ value: inputValue, delay: 500 });
  const findMajorList = model.useMajorList({ major: debouncedValue });
  const ref = useOutsideClick({ callback: () => setIsOpen(false) });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setIsOpen(true);
    },
    [],
  );

  const handleMajorSelect = useCallback(
    (major: string) => {
      toggleMajor(major);
      setInputValue('');
      setIsOpen(false);
    },
    [toggleMajor],
  );

  const selectedTags = useMemo(
    () => (
      <div className="flex max-w-full flex-wrap gap-1">
        {selectedMajor.map((major) => (
          <LectureSearchItem.RemovableTag
            key={major}
            value={major}
            onRemove={() => toggleMajor(major)}
          />
        ))}
      </div>
    ),
    [selectedMajor, toggleMajor],
  );

  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-medium text-gray-700">전공 선택</h3>
      <div className="relative" ref={ref}>
        <div
          className="flex w-full flex-wrap gap-1 text-sm"
          onClick={() => setIsOpen(true)}
        >
          {selectedMajor.length > 0 && selectedTags}
          <div className="flex grow items-center">
            <LectureSearchItem.Input
              placeholder="전공을 입력해주세요"
              inputValue={inputValue}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
        {findMajorList.length > 0 && isOpen && (
          <div className="absolute z-40 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-400 bg-white drop-shadow-md">
            {findMajorList.map((major) => (
              <LectureSearchItem.DropdownButton
                key={major}
                isSelected={selectedMajor.includes(major)}
                onClick={() => handleMajorSelect(major)}
              >
                {major}
              </LectureSearchItem.DropdownButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

LectureMajorInput.displayName = 'LectureMajorInput';

const LectureSearchInput = memo(() => {
  const { setSearchKeyword } = model.useLectureFilters();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      setSearchKeyword(value);
    },
    [setSearchKeyword],
  );

  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-medium text-gray-700">강의 검색</h3>
      <LectureSearchItem.Input
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        placeholder="강의명을 입력해주세요"
      />
    </div>
  );
});

LectureSearchInput.displayName = 'LectureSearchInput';

export default function LectureSearch() {
  const {
    selectedRegion,
    selectedGrade,
    selectedDay,
    selectedPeriod,
    selectedLectureType,
    selectedMajor,
    searchKeyword,
    toggleRegion,
    toggleGrade,
    toggleDay,
    togglePeriod,
    defaultValues,
  } = model.useLectureFilters();

  const debouncedSearchKeyword = useDebounce({
    value: searchKeyword,
    delay: 500,
  });

  const searchTableProps = useMemo(
    () => ({
      isAddableLecture: () => true,
      selectedValues: {
        campus: selectedRegion.map(
          (region) =>
            `${region}${model.DAY_STATUS[defaultValues.dayStatus]}` as
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
      },
    }),
    [
      selectedRegion,
      selectedLectureType,
      selectedGrade,
      selectedDay,
      selectedPeriod,
      selectedMajor,
      debouncedSearchKeyword,
      defaultValues.dayStatus,
    ],
  );

  return (
    <div className="w-full space-y-4">
      <div className="w-7/8 flex flex-wrap gap-4">
        <LectureSearchItem.Filter
          title="캠퍼스"
          list={model.REGION_VALUE_ARRAY}
          selectedItems={selectedRegion}
          onToggleItem={toggleRegion}
        />
        <LectureSearchItem.Filter
          title="학년 선택"
          list={Object.keys(model.GRADE) as types.Grade[]}
          selectedItems={selectedGrade}
          onToggleItem={toggleGrade}
        />
        <LectureSearchItem.Filter
          title="요일 선택"
          list={DAY_VALUE_ARRAY}
          selectedItems={selectedDay}
          onToggleItem={toggleDay}
        />
      </div>
      <LectureSearchPeriodDropdown
        selectedPeriod={selectedPeriod}
        dayStatus={defaultValues.dayStatus}
        onPeriodToggle={togglePeriod}
      />
      <LectureSearchLectureTypeDropdown />
      <LectureMajorInput />
      <LectureSearchInput />
      <LectureSearchTable {...searchTableProps} />
    </div>
  );
}
