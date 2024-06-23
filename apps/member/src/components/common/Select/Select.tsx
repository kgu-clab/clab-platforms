import { ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '@clab/utils';

interface SelectOptions {
  name: string | number;
  value: string | number;
}

interface Props extends ComponentPropsWithRef<'select'> {
  label?: string;
  options: readonly SelectOptions[];
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ options = [], label, className, id, ...rest }, ref) => {
    return (
      <div className={cn('flex flex-col', className)}>
        {label && (
          <label htmlFor={id} className="mb-1 ml-1 text-xs">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className="w-full appearance-none rounded-md border p-2 disabled:bg-gray-50"
          {...rest}
        >
          <option disabled value={'none'}>
            미선택
          </option>
          {options.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
Select.displayName = 'Select';

export default Select;
