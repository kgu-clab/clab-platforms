import React, { ComponentPropsWithRef } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';
import { menubarItemVariants, menubarVariants } from './Menubar.styles';
import type { MenubarGapVariant } from './Menubar.types';

interface MenubarProps
  extends ComponentPropsWithRef<'ul'>,
    VariantProps<typeof menubarVariants> {
  gap?: MenubarGapVariant;
}

interface MenubarItemProps
  extends ComponentPropsWithRef<'li'>,
    VariantProps<typeof menubarItemVariants> {
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
