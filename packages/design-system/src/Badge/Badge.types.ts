import { type VariantProps } from 'cva';

import type { DesignSystemColorVariant } from '../types';
import { badgeVariants } from './Badge.styles';

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
export type BadgeColorVariant = DesignSystemColorVariant;
