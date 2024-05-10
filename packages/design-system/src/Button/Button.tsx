import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';
import { buttonVariants } from './Button.styles';
import type { ButtonColorVariant, ButtonSizeVariant } from './Button.types';

interface ButtonProps
  extends ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
  color?: ButtonColorVariant;
  size?: ButtonSizeVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, color, size, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ color, size }), className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
