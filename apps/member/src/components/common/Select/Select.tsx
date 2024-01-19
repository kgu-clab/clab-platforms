import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';

interface SelectProps extends ComponentPropsWithRef<'select'> {
  className?: string;
  data: {
    id: number;
    name: string;
  }[];
}

const Select = ({ className, data, ...rest }: SelectProps) => {
  return (
    <select
      className={classNames('border p-2 rounded-md', className)}
      {...rest}
    >
      <option disabled value={0}>
        미선택
      </option>
      {data.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
