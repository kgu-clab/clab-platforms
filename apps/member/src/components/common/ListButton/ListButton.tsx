import classNames from 'classnames';
import { ComponentPropsWithRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
        'flex items-center rounded p-1 transition hover:bg-gray-100 hover:font-medium w-full text-left',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ListButton;
