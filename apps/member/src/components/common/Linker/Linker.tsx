import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@clab/utils';

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
      className={cn(
        "font-medium text-black/60 underline-offset-2 after:content-['_↗'] hover:text-black hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default Linker;
