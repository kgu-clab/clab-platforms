import {
  InputHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
} from 'react';

import { CloseOutline } from '@clab-platforms/icon';

interface SearchRemovableTagProps {
  value: string;
  onRemove: () => void;
}

interface SearchFilterProps<T> {
  title: string;
  list: T[];
  selectedItems: T[];
  onToggleItem: (item: T) => void;
}

interface SearchDropdownProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  selectedItems: ReactNode;
}

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SearchDropdownButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: ReactNode;
}

function SearchRemovableTag({ value, onRemove }: SearchRemovableTagProps) {
  return (
    <button
      type="button"
      className="flex min-w-12 items-center justify-between gap-x-1 rounded-md bg-gray-100 px-1.5 py-0 text-sm text-gray-700 hover:bg-gray-200"
      onClick={onRemove}
    >
      <span>{value}</span>
      <CloseOutline width={16} height={16} />
    </button>
  );
}

function SearchFilter<T extends string>({
  title,
  list,
  selectedItems,
  onToggleItem,
}: SearchFilterProps<T>) {
  const selectedSet = useMemo(() => new Set(selectedItems), [selectedItems]);

  return (
    <div className="flex w-fit shrink-0 flex-nowrap items-center gap-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="border-time-table-border divide-time-table-border flex flex-nowrap divide-x overflow-hidden rounded-md border">
        {list.map((item) => (
          <button
            key={item}
            type="button"
            className={`px-3 py-1 text-sm transition-colors hover:bg-gray-300/20 ${
              selectedSet.has(item)
                ? 'bg-time-table-header'
                : 'bg-white text-gray-700'
            }`}
            onClick={() => onToggleItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchDropdown({
  title,
  isOpen,
  onToggle,
  selectedItems,
  children,
}: SearchDropdownProps) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-medium text-gray-700">{title}</h3>
      <div className="relative">
        <div
          className="flex min-h-[40px] w-full cursor-pointer items-center justify-between rounded-md border border-gray-400 bg-white px-3 py-2"
          onClick={onToggle}
        >
          <div className="flex-1">{selectedItems}</div>
          <svg
            className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchDropdownButton({
  isSelected,
  onClick,
  children,
}: SearchDropdownButtonProps) {
  return (
    <button
      type="button"
      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SearchInput({
  inputValue,
  handleInputChange,
  ...rest
}: SearchInputProps) {
  return (
    <input
      className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none"
      value={inputValue}
      onChange={handleInputChange}
      {...rest}
    />
  );
}

export const LectureSearchItem = {
  Input: SearchInput,
  Filter: SearchFilter,
  Dropdown: SearchDropdown,
  DropdownButton: SearchDropdownButton,
  RemovableTag: SearchRemovableTag,
};

SearchInput.displayName = 'LectureSearchInput';
SearchFilter.displayName = 'LectureSearchFilter';
SearchDropdown.displayName = 'LectureSearchDropdown';
SearchDropdownButton.displayName = 'LectureSearchDropdownButton';
SearchRemovableTag.displayName = 'LectureSearchRemovableTag';
