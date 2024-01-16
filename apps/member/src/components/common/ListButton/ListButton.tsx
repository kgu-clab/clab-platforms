import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

interface ListButtonProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const ListButton = ({ to, className, children }: ListButtonProps) => {
  return (
    <Link
      to={to}
      className={classNames(
        'flex items-center rounded p-1 transition hover:bg-gray-100 hover:font-medium',
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default ListButton;
