import classNames from 'classnames';
import { DEFAULT } from '@constants/default';
import { ComponentPropsWithRef } from 'react';

interface SelectOptions {
  name: string | number;
  value: string | number;
}

interface SelectProps extends ComponentPropsWithRef<'select'> {
  options: readonly SelectOptions[];
}

const Select = ({ options = [], className, ...rest }: SelectProps) => {
  return (
    <select
      className={classNames('border p-2 rounded-md', className)}
      {...rest}
    >
      <option disabled value={DEFAULT.SELECT}>
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
