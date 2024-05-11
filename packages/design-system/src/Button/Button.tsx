import React, { type ButtonHTMLAttributes, forwardRef } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { Spinner } from '../Spinner';
import { cn } from '../utils';
import { buttonVariants } from './Button.styles';
import type { ButtonColorVariant, ButtonSizeVariant } from './Button.types';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  color?: ButtonColorVariant;
  size?: ButtonSizeVariant;
  disabled?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, size, disabled, loading, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ color, size, disabled, loading }),
          className,
        )}
        disabled={loading || disabled}
        {...rest}
      >
        {loading && <Spinner className="absolute inset-0" />}
        <span className={cn({ 'opacity-0': loading })}>{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
