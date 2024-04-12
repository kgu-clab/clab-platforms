import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';

import { badgeStyleColored } from './Badge.style';
import type { BadgeColorType } from './Badge.types';

interface BadgeProps extends ComponentPropsWithRef<'span'> {
  color?: BadgeColorType;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ color = 'blue', children }, ref) => {
    return (
      <span
        ref={ref}
        className={twMerge(
          'rounded px-2 text-sm font-medium',
          badgeStyleColored[color],
        )}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
