import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';
import { badgeVariants } from './Badge.styles';
import type { BadgeColorVariant } from './Badge.types';

interface BadgeProps
  extends ComponentPropsWithRef<'span'>,
    VariantProps<typeof badgeVariants> {
  color?: BadgeColorVariant;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ color, className, children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ color }), className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
