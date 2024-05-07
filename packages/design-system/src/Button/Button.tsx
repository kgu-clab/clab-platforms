import React, { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';

import { cn } from '../utils';
import type { ButtonColorVariant, ButtonSizeVariant } from './Button.types';

interface Props extends ComponentPropsWithRef<'button'> {
  className?: string;
  children: ReactNode;
  color?: ButtonColorVariant;
  size?: ButtonSizeVariant;
}

const colorVariant = {
  white: 'hover:bg-gray-200 text-gray-600 border-gray-600',
  orange: 'hover:bg-orange-200 text-orange-600 border-orange-600',
  green: 'hover:bg-green-200 text-green-600 border-green-600',
  red: 'hover:bg-red-200 text-red-600 border-red-600',
  blue: 'hover:bg-blue-200 text-blue-600 border-blue-600',
} as const;

const sizeVariant = {
  sm: 'px-2 py-1',
  md: 'p-2',
  lg: 'px-4 py-2',
} as const;

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, color = 'white', size = 'md', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg border text-sm font-semibold transition-colors',
          colorVariant[color],
          sizeVariant[size],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
