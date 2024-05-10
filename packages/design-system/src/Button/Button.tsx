import React, { type ButtonHTMLAttributes, forwardRef } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';
import { buttonVariants } from './Button.styles';
import type { ButtonColorVariant, ButtonSizeVariant } from './Button.types';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  color?: ButtonColorVariant;
  size?: ButtonSizeVariant;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, size, disabled, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ color, size, disabled }), className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
