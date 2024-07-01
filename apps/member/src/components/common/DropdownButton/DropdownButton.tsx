import { useState } from 'react';

import { ChevronDownOutline } from '@clab/icon';
import { cn } from '@clab/utils';

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
    <button className={cn(className)} onClick={handelClick}>
      <ChevronDownOutline
        className={cn(
          'h-5 w-5 cursor-pointer rounded-full transition hover:bg-gray-100',
          { 'rotate-180': open },
        )}
      />
    </button>
  );
};

export default DropdownButton;
