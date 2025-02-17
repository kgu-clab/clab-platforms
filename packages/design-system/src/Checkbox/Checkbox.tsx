import React from 'react';

import { cn } from '@clab-platforms/utils';

interface Props extends React.ComponentProps<'input'> {
  id: string;
  label: string;
  checkboxClassName?: string;
}

export default function Checkbox({
  id,
  label,
  className,
  checkboxClassName,
  ...props
}: Props) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        id={id}
        type="checkbox"
        className={cn('accent-clab-main', checkboxClassName)}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
