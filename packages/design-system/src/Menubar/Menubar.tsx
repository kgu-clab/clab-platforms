import React, { type HTMLAttributes } from 'react';

import { cn } from '@clab/utils';

import { menubarItemVariants, menubarVariants } from './Menubar.styles';
import type {
  MenubarGapVariant,
  MenubarItemVariantProps,
  MenubarVariantProps,
} from './Menubar.types';

interface MenubarProps
  extends HTMLAttributes<HTMLUListElement>,
    MenubarVariantProps {
  gap?: MenubarGapVariant;
}

interface MenubarItemProps
  extends HTMLAttributes<HTMLLIElement>,
    MenubarItemVariantProps {
  selected?: boolean;
}

const Menubar = ({ gap, className, children, ...rest }: MenubarProps) => {
  return (
    <ul className={cn(menubarVariants({ gap }), className)} {...rest}>
      {children}
    </ul>
  );
};

const MenubarItem = ({
  selected,
  className,
  children,
  ...rest
}: MenubarItemProps) => {
  return (
    <li className={cn(menubarItemVariants({ selected }), className)} {...rest}>
      {children}
    </li>
  );
};

Menubar.displayName = 'Menubar';
MenubarItem.displayName = 'MenubarItem';

Menubar.Item = MenubarItem;

export default Menubar;
