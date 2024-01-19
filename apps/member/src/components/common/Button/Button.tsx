import type { ButtonColorType, ButtonSizeType } from '@type/button';
import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';
import { buttonStyleColored, buttonStyleSized } from './Button.style';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  className?: string;
  children: React.ReactNode;
  color?: ButtonColorType;
  size?: ButtonSizeType;
}

const Button = ({
  className,
  children,
  color = 'white',
  size = 'md',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        'font-semibold text-sm rounded-lg border',
        buttonStyleColored(color),
        buttonStyleSized(size),
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
