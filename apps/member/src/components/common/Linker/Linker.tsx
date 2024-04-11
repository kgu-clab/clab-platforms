import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface LinkerProps extends PropsWithChildren {
  to: string | Partial<Location>;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

const Linker = ({ to, target, className, children }: LinkerProps) => {
  return (
    <Link
      to={to}
      target={target}
      className={classNames(
        "font-medium hover:underline underline-offset-2 text-black/60 hover:text-black after:content-['_↗']",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default Linker;
