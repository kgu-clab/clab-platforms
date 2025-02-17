import { ComponentPropsWithRef } from 'react';
import { useNavigate } from 'react-router';

import { cn } from '@clab-platforms/utils';

interface ListButtonProps extends ComponentPropsWithRef<'button'> {
  to?: string;
}

const ListButton = ({
  to,
  className,
  children,
  onClick,
  ...rest
}: ListButtonProps) => {
  const navigate = useNavigate();

  const onClickLink = () => navigate(to!);

  return (
    <button
      onClick={to ? onClickLink : onClick}
      className={cn(
        'flex w-full items-center rounded p-1 text-left transition-colors hover:bg-gray-100',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ListButton;
