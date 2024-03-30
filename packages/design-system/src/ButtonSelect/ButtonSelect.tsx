import React from 'react';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ButtonSelectOptionProps,
  ButtonSelectProps,
} from './ButtonSelect.types';

const ButtonSelect = ({ options, value, onChange }: ButtonSelectProps) => {
  const [selected, setSelected] = useState(value || options[0].value);

  const handleOptionClick = useCallback(
    (value: string) => {
      setSelected(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <div className="flex items-center w-full">
      {options.map((option, index) => (
        <ButtonSelect.Option
          key={index}
          className={twMerge(
            selected === option.value && 'border-clab-main font-semibold',
          )}
          onClick={() => handleOptionClick(option.value)}
        >
          <span className="p-1 bg-gray-100 rounded-lg w-fit">
            {option.icon}
          </span>
          <span>{option.value}</span>
        </ButtonSelect.Option>
      ))}
    </div>
  );
};

const Option = ({ className, children, ...rest }: ButtonSelectOptionProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        'first:rounded-l-lg last:rounded-r-lg border w-full hover:border-clab-main transition-colors p-4 flex flex-col items-center justify-center',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Option.displayName = 'ButtonSelectOption';

ButtonSelect.Option = Option;

export default ButtonSelect;
