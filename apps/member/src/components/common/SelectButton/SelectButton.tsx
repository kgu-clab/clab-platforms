import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface SelectButtonProps {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

const SelectButton = ({ to, className, children }: SelectButtonProps) => {
  return (
    <Link
      to={to}
      className={classNames(
        'rounded-md leading-relaxed transition hover:translate-x-1.5 hover:font-semibold',
        className
      )}>
      {children}
    </Link>
  );
};

export default SelectButton;
