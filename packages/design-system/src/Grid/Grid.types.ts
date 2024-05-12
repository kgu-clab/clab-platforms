import { type VariantProps } from 'class-variance-authority';

import type { DesignSystemSizeVariant } from '../types';
import { gridVariants } from './Grid.styles';

export type GridVariantProps = VariantProps<typeof gridVariants>;

export type GridColVariant =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';
export type GridGapVariant = DesignSystemSizeVariant<'none'>;
