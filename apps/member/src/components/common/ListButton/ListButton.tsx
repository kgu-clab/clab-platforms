import { ComponentPropsWithRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';

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

  const onClickLink = useCallback(() => {
    to && navigate(to);
  }, [navigate, to]);

  return (
    <button
      onClick={to ? onClickLink : onClick}
      className={classNames(
        'flex w-full items-center rounded p-1 text-left transition hover:bg-gray-100 hover:font-medium',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ListButton;
