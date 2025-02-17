import React from 'react';

import { cn } from '@clab-platforms/utils';

import { gridVariants } from './Grid.styles';
import type {
  GridColVariant,
  GridGapVariant,
  GridVariantProps,
} from './Grid.types';

interface Props extends React.ComponentProps<'div'>, GridVariantProps {
  col?: GridColVariant;
  gap?: GridGapVariant;
}

export default function Grid({
  col,
  gap,
  children,
  className,
  ...props
}: Props) {
  return (
    <div className={cn(gridVariants({ col, gap }), className)} {...props}>
      {children}
    </div>
  );
}
