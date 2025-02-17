import { ComponentPropsWithRef } from 'react';

import { cn } from '@clab-platforms/utils';

interface SelectOptions {
  name: string | number;
  value: string | number;
}

interface Props extends ComponentPropsWithRef<'select'> {
  label?: string;
  options: readonly SelectOptions[];
}

export default function Select({
  options = [],
  label,
  className,
  id,
  ...rest
}: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label htmlFor={id} className="mb-1 ml-1 text-left text-xs">
          {label}
        </label>
      )}
      <select
        id={id}
        className="w-full appearance-none rounded-md border p-2 text-black disabled:bg-gray-50"
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
}
