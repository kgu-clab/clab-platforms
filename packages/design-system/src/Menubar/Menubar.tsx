import React, { ComponentPropsWithRef } from 'react';

import { cn } from '../utils';
import type { MenubarGapVariant } from './Menubar.types';

interface Props extends ComponentPropsWithRef<'ul'> {
  gap?: MenubarGapVariant;
}

interface ItemProps extends ComponentPropsWithRef<'li'> {
  selected?: boolean;
}

const menubarGapVariant = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-8',
  xl: 'gap-10',
} as const;

const Menubar = ({ gap = 'md', className, children, ...rest }: Props) => {
  return (
    <ul
      className={cn(
        'flex font-semibold text-gray-400',
        menubarGapVariant[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </ul>
  );
};

const MenubarItem = ({ selected, className, children, ...rest }: ItemProps) => {
  return (
    <li
      className={cn(
        'cursor-pointer transition-colors hover:text-black',
        { 'text-black underline underline-offset-4': selected },
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
};

Menubar.displayName = 'Menubar';
MenubarItem.displayName = 'MenubarItem';

Menubar.Item = MenubarItem;

export default Menubar;
