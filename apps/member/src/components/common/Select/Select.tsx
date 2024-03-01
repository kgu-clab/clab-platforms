import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';

interface SelectOptions {
  name: string | number;
  value: string | number;
}

interface SelectProps extends ComponentPropsWithRef<'select'> {
  options: SelectOptions[];
}

const Select = ({ className, options = [], ...rest }: SelectProps) => {
  return (
    <select
      className={classNames('border p-2 rounded-md', className)}
      {...rest}
    >
      <option disabled value={0}>
        미선택
      </option>
      {options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
