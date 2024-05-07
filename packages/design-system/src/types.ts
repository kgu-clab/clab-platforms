type ExcludeValue<T, V> = T extends V ? never : T;

export type DesignSystemSizeVariant<
  T = never,
  ExcludeSizes = never,
> = ExcludeValue<T | 'sm' | 'md' | 'lg', ExcludeSizes>;

export type DesignSystemColorVariant<
  T = never,
  ExcludeColors = never,
> = ExcludeValue<T | 'red' | 'green' | 'blue' | 'yellow', ExcludeColors>;
