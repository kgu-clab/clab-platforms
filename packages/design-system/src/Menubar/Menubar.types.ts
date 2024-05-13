import { type VariantProps } from 'cva';

import type { DesignSystemSizeVariant } from '../types';
import { menubarItemVariants, menubarVariants } from './Menubar.styles';

export type MenubarVariantProps = VariantProps<typeof menubarVariants>;
export type MenubarItemVariantProps = VariantProps<typeof menubarItemVariants>;
export type MenubarGapVariant = DesignSystemSizeVariant<'xl'>;
