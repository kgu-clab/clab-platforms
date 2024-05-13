import { type VariantProps } from 'cva';

import type { DesignSystemSizeVariant } from '../types';
import { spinnerVariants } from './Spinner.styles';

export type SpinnerVariantProps = VariantProps<typeof spinnerVariants>;
export type SpinnerSizeVariant = DesignSystemSizeVariant;
