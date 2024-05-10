import React, { ButtonHTMLAttributes, useCallback, useState } from 'react';

import { cn } from '../utils';
import type { TabsOptions } from './Tabs.types';

export interface TabsProps {
  options: readonly TabsOptions[];
  value?: string;
  onChange?: (value: string) => void;
}

export interface TabsOptionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Tabs = ({ options, value, onChange }: TabsProps) => {
  const [selected, setSelected] = useState(value ?? options[0].value);

  const handleOptionClick = useCallback(
    (value: string) => {
      setSelected(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <div className="flex w-full items-center divide-x rounded-lg border">
      {options.map((option) => (
        <TabsOption
          key={`tab-${option.value}`}
          className={cn({
            'bg-gray-50 font-semibold': selected === option.value,
          })}
          onClick={() => handleOptionClick(option.value)}
        >
          <span className="w-fit rounded bg-gray-100 p-1">{option.icon}</span>
          <span>{option.value}</span>
        </TabsOption>
      ))}
    </div>
  );
};

const TabsOption = ({ className, children, ...rest }: TabsOptionProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full flex-col items-center justify-center gap-1 p-2 transition-colors first:rounded-l-lg last:rounded-r-lg hover:bg-gray-50',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Tabs.displayName = 'Tabs';
TabsOption.displayName = 'TabsOption';

export default Tabs;
