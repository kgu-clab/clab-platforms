import React from 'react';

import { cn } from '@clab-platforms/utils';

import { badgeVariants } from './Badge.styles';
import type { BadgeColorVariant, BadgeVariantProps } from './Badge.types';

interface Props extends React.ComponentProps<'span'>, BadgeVariantProps {
  color?: BadgeColorVariant;
}

export default function Badge({ color, className, children, ...props }: Props) {
  return (
    <span className={cn(badgeVariants({ color }), className)} {...props}>
      {children}
    </span>
  );
}
