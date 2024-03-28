import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';

interface SelectOptions {
  name: string | number;
  value: string | number;
}

interface SelectProps extends ComponentPropsWithRef<'select'> {
  label?: string;
  options: readonly SelectOptions[];
}

const Select = ({
  options = [],
  label,
  className,
  id,
  ...rest
}: SelectProps) => {
  return (
    <div className={classNames('flex flex-col h-full', className)}>
      {label && (
        <label htmlFor={id} className="mb-1 ml-1 text-xs">
          {label}
        </label>
      )}
      <select
        id={id}
        className="w-full p-2 border rounded-md grow disabled:bg-gray-50"
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
};

export default Select;
