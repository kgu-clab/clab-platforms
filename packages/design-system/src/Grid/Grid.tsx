import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';
import { gridVariants } from './Grid.styles';
import { GridColVariant, GridGapVariant } from './Grid.types';

interface GridProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof gridVariants> {
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
