import { ComponentPropsWithRef } from 'react';

import { cn } from '@utils/string';

interface ActionButtonProps extends ComponentPropsWithRef<'button'> {
  color?: 'black' | 'red' | 'blue' | 'orange';
}

const colorStyled = {
  black: 'text-black',
  red: 'text-red-500',
  blue: 'text-blue-500',
  orange: 'text-orange-500',
} as const;

const ActionButton = ({
  color = 'black',
  className,
  children,
  ...props
}: ActionButtonProps) => {
  return (
    <button
      className={cn(
        'underline-offset-2 hover:underline',
        colorStyled[color],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
