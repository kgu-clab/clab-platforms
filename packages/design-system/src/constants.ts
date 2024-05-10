import type {
  DesignSystemColorVariant,
  DesignSystemSizeVariant,
} from './types';

/**
 * Get a summary of the variants.
 */
function getVariantSummary(variants: string[]): string {
  return variants.map((variant) => `"${variant}"`).join(' | ');
}
/**
 * Design system color variants.
 */
export const DESIGN_SYSTEM_COLOR_VARIANT: DesignSystemColorVariant[] = [
  'primary',
  'secondary',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
];
/**
 * Design system color variant summary.
 */
export const DESIGN_SYSTEM_COLOR_VARIANT_SUMMARY = getVariantSummary(
  DESIGN_SYSTEM_COLOR_VARIANT,
);
/**
 * Design system size variants.
 */
export const DESIGN_SYSTEM_SIZE_VARIANT: DesignSystemSizeVariant[] = [
  'sm',
  'md',
  'lg',
];
/**
 * Design system size variant summary.
 */
export const DESIGN_SYSTEM_SIZE_VARIANT_SUMMARY = getVariantSummary(
  DESIGN_SYSTEM_SIZE_VARIANT,
);
