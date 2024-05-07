import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '../utils';
import type { BadgeColorVariant } from './Badge.types';

interface Props extends ComponentPropsWithRef<'span'> {
  color?: BadgeColorVariant;
}

const colorVariant = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-600',
} as const;

const Badge = forwardRef<HTMLSpanElement, Props>(
  ({ color = 'blue', className, children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'text-nowrap rounded px-2 text-sm font-medium',
          colorVariant[color],
          className,
        )}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
