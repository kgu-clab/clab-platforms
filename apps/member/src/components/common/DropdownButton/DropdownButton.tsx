import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import classNames from 'classnames';

interface DropdownButtonProps {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
}

const DropdownButton = ({
  className,
  onClick,
  isOpen = false,
}: DropdownButtonProps) => {
  const [open, setOpen] = useState(isOpen);

  const handelClick = () => {
    onClick();
    setOpen((prev) => !prev);
  };

  return (
    <div className={classNames(className)} onClick={handelClick}>
      <FiChevronDown
        className={classNames(
          'h-5 w-5 cursor-pointer rounded-full transition hover:bg-gray-100',
          {
            'rotate-180': open,
          },
        )}
      />
    </div>
  );
};

export default DropdownButton;
