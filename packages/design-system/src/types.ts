type ExcludeValue<T, V> = T extends V ? never : T;
/**
 * Size variants for the design system
 */
export type DesignSystemSizeVariant<
  T = never,
  ExcludeSizes = never,
> = ExcludeValue<T | 'sm' | 'md' | 'lg', ExcludeSizes>;
/**
 * Color variants for the design system
 */
export type DesignSystemColorVariant<
  T = never,
  ExcludeColors = never,
> = ExcludeValue<
  T | 'primary' | 'secondary' | 'red' | 'orange' | 'yellow' | 'green' | 'blue',
  ExcludeColors
>;
