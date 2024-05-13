import { type VariantProps } from 'cva';

import type {
  DesignSystemColorVariant,
  DesignSystemSizeVariant,
} from '../types';
import { buttonVariants } from './Button.styles';

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonColorVariant = DesignSystemColorVariant;
export type ButtonSizeVariant = DesignSystemSizeVariant;
