import classNames from 'classnames';
import DropdownButton from '../DropdownButton/DropdownButton';
import { Fragment, useState } from 'react';

interface PanelProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  action?: React.ReactNode[];
}

const Panel = ({
  className,
  children,
  icon,
  label,
  description,
  action
}: PanelProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={classNames('w-full rounded-lg border bg-white', className)}>
      <div className="p-4">
        {label && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl font-bold text-black">
              <span className="rounded-md bg-gray-100 p-1">{icon}</span>
              <span className="grow text-nowrap">{label}</span>
              <span className="truncate border-l pl-2 text-sm text-gray-500">
                {description}
              </span>
            </div>
            <DropdownButton
              isOpen={open}
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
        )}
        <div
          className={classNames(
            'overflow-hidden transition duration-500 ease-in-out',
            { 'mt-4': label && open },
            open ? 'opacity-100' : 'max-h-0 opacity-0'
          )}>
          {children}
        </div>
      </div>
      {action && (
        <div className="grid grid-cols-2 divide-x text-center text-sm font-semibold text-gray-500 border-t">
          {action.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Panel;
