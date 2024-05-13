import React, { type HTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils';
import { badgeVariants } from './Badge.styles';
import type { BadgeColorVariant, BadgeVariantProps } from './Badge.types';

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    BadgeVariantProps {
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
