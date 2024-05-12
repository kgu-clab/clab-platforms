import React, { type HTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils';
import { gridVariants } from './Grid.styles';
import type {
  GridColVariant,
  GridGapVariant,
  GridVariantProps,
} from './Grid.types';

interface GridProps extends HTMLAttributes<HTMLDivElement>, GridVariantProps {
  col?: GridColVariant;
  gap?: GridGapVariant;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ col, gap, children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ col, gap }), className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
