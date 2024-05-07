import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '../utils';
import { GridColVariant, GridGapVariant } from './Grid.types';

interface Props extends ComponentPropsWithRef<'div'> {
  col?: GridColVariant;
  gap?: GridGapVariant;
}

const colVariant = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
} as const;

const sizeVariant = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
} as const;

const Grid = forwardRef<HTMLDivElement, Props>(
  ({ col = 1, gap = 'none', children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid', colVariant[col], sizeVariant[gap], className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
