/* eslint-disable react/display-name */
import classNames from 'classnames';

import DropdownButton from '../DropdownButton/DropdownButton';

interface PanelProps {
  className?: string;
  children?: React.ReactNode;
}

interface PanelHeaderProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

interface PanelBodyProps {
  isOpen?: boolean;
  isHeader?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface PanelActionProps {
  children: React.ReactNode;
  className?: string;
}

const Panel = ({ className, children }: PanelProps) => {
  return (
    <div className={classNames('w-full rounded-lg border bg-white', className)}>
      {children}
    </div>
  );
};

Panel.Header = ({
  icon,
  label,
  description,
  isOpen,
  onClick,
}: PanelHeaderProps) => {
  return (
    <div className="m-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-xl font-bold text-black">
        <span className="rounded-md bg-gray-100 p-1">{icon}</span>
        <span className="grow text-nowrap">{label}</span>
        {description && (
          <span className="truncate border-l pl-2 text-sm text-gray-500">
            {description}
          </span>
        )}
      </div>
      {isOpen != undefined && onClick && (
        <DropdownButton isOpen={isOpen} onClick={onClick} />
      )}
    </div>
  );
};

Panel.Body = ({ isOpen = true, children, className }: PanelBodyProps) => {
  const openStyle = isOpen ? 'opacity-100 m-4' : 'max-h-0 opacity-0';
  return (
    <div
      className={classNames(
        'overflow-hidden transition duration-500 ease-in-out',
        openStyle,
        className,
      )}
    >
      {children}
    </div>
  );
};

Panel.Action = ({ children, className }: PanelActionProps) => {
  return (
    <div
      className={classNames(
        'grid grid-cols-2 divide-x border-t text-center text-sm font-semibold text-gray-500',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
