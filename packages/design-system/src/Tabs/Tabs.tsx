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
    <div className="flex w-full items-center divide-x rounded-lg border">
      {options.map((option, index) => (
        <Tabs.Option
          key={index}
          className={twMerge(
            selected === option.value && 'bg-gray-50 font-semibold',
          )}
          onClick={() => handleOptionClick(option.value)}
        >
          <span className="w-fit rounded bg-gray-100 p-1">{option.icon}</span>
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
        'flex w-full flex-col items-center justify-center gap-1 p-2 transition-colors first:rounded-l-lg last:rounded-r-lg hover:bg-gray-50',
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
