import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

interface LinkerProps {
  to: string | Partial<Location>;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Linker = ({ to, className, children }: LinkerProps) => {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate(to)}
      className={classNames(
        "text-bold cursor-pointer text-sm underline after:content-['_↗']",
        className
      )}>
      {children}
    </a>
  );
};

export default Linker;
