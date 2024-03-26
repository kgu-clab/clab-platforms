import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { gridStyleCols, gridStyleGaps } from './Grid.style';
import { GridStyleColsType, GridStyleGapsType } from './Grid.types';

interface GridProps extends ComponentPropsWithRef<'div'> {
  col?: GridStyleColsType;
  gap?: GridStyleGapsType;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ col = 1, gap = 'none', children }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('grid', gridStyleCols[col], gridStyleGaps[gap])}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
