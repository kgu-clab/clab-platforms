import React from 'react';

import { cn } from '@clab-platforms/utils';

import { menubarItemVariants, menubarVariants } from './Menubar.styles';
import type {
  MenubarGapVariant,
  MenubarItemVariantProps,
  MenubarVariantProps,
} from './Menubar.types';

interface MenubarProps extends React.ComponentProps<'ul'>, MenubarVariantProps {
  gap?: MenubarGapVariant;
}

interface MenubarItemProps
  extends React.ComponentProps<'li'>,
    MenubarItemVariantProps {
  selected?: boolean;
}

function Menubar({ gap, className, children, ...props }: MenubarProps) {
  return (
    <ul className={cn(menubarVariants({ gap }), className)} {...props}>
      {children}
    </ul>
  );
}

function MenubarItem({
  selected,
  className,
  children,
  ...props
}: MenubarItemProps) {
  return (
    <li className={cn(menubarItemVariants({ selected }), className)} {...props}>
      {children}
    </li>
  );
}

Menubar.displayName = 'Menubar';
MenubarItem.displayName = 'MenubarItem';

Menubar.Item = MenubarItem;

export default Menubar;
