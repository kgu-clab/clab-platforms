import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';

interface InputProps extends ComponentPropsWithRef<'input'> {
  className?: string;
}

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={classNames('border p-2 rounded-lg', className)}
      {...rest}
    />
  );
};

export default Input;
