import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';

interface SelectOptions {
  id: number;
  name: string;
}

interface SelectProps extends ComponentPropsWithRef<'select'> {
  options: SelectOptions[];
}

const Select = ({ className, options, ...rest }: SelectProps) => {
  return (
    <select
      className={classNames('border p-2 rounded-md', className)}
      {...rest}
    >
      <option disabled value={0}>
        미선택
      </option>
      {options.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
