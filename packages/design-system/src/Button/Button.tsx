import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { buttonStyleColored, buttonStyleSized } from './Button.style';
import type { ButtonColorType, ButtonSizeType } from './Button.types';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  className?: string;
  children: ReactNode;
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
      className={twMerge(
        'font-semibold text-sm rounded-lg border transition-colors',
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
