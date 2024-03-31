import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface LinkerProps extends PropsWithChildren {
  to: string | Partial<Location>;
  className?: string;
}

const Linker = ({ to, className, children }: LinkerProps) => {
  return (
    <Link
      to={to}
      className={classNames(
        "font-semibold hover:underline underline-offset-2 text-black/50 hover:text-black after:content-['_↗']",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default Linker;
