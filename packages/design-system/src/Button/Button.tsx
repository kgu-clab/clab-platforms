import React from 'react';

import { cn } from '@clab-platforms/utils';

import { Spinner } from '../Spinner';
import { buttonVariants } from './Button.styles';
import type {
  ButtonColorVariant,
  ButtonSizeVariant,
  ButtonVariantProps,
} from './Button.types';

interface Props extends React.ComponentProps<'button'>, ButtonVariantProps {
  color?: ButtonColorVariant;
  size?: ButtonSizeVariant;
  loading?: boolean;
}

export default function Button({
  color,
  size,
  disabled,
  loading,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        buttonVariants({ color, size, disabled, loading }),
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner className="absolute inset-0" />}
      <span className={cn({ 'opacity-0': loading })}>{children}</span>
    </button>
  );
}
