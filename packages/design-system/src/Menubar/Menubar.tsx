import React, { ComponentPropsWithRef } from 'react';

import { twMerge } from 'tailwind-merge';

import { menubarStyleGap } from './Menubar.style';

interface MenubarProps extends ComponentPropsWithRef<'ul'> {
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

interface MenubarItemProps extends ComponentPropsWithRef<'li'> {
  selected?: boolean;
}

const Menubar = ({
  gap = 'md',
  className,
  children,
  ...rest
}: MenubarProps) => {
  return (
    <ul
      className={twMerge(
        'flex font-semibold text-gray-400',
        menubarStyleGap[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </ul>
  );
};
Menubar.displayName = 'Menubar';

const MenubarItem = ({
  selected,
  className,
  children,
  ...rest
}: MenubarItemProps) => {
  return (
    <li
      className={twMerge(
        'cursor-pointer transition-colors hover:text-black',
        selected && 'text-black underline underline-offset-4',
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
};
MenubarItem.displayName = 'MenubarItem';

export { Menubar, MenubarItem };
