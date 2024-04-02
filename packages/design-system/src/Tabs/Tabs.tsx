import React from 'react';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TabsOptionProps, TabsProps } from './Tabs.types';

const Tabs = ({ options, value, onChange }: TabsProps) => {
  const [selected, setSelected] = useState(value || options[0].value);

  const handleOptionClick = useCallback(
    (value: string) => {
      setSelected(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <div className="flex items-center w-full border divide-x rounded-lg">
      {options.map((option, index) => (
        <Tabs.Option
          key={index}
          className={twMerge(
            selected === option.value && 'bg-gray-50 font-semibold',
          )}
          onClick={() => handleOptionClick(option.value)}
        >
          <span className="p-1 bg-gray-100 rounded w-fit">{option.icon}</span>
          <span>{option.value}</span>
        </Tabs.Option>
      ))}
    </div>
  );
};

const Option = ({ className, children, ...rest }: TabsOptionProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        'first:rounded-l-lg last:rounded-r-lg w-full hover:bg-gray-50 transition-colors p-2 flex flex-col items-center justify-center gap-1',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Option.displayName = 'TabsOption';

Tabs.Option = Option;

export default Tabs;
