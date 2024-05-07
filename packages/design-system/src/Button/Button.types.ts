import type {
  DesignSystemColorVariant,
  DesignSystemSizeVariant,
} from '../types';

export type ButtonColorVariant = DesignSystemColorVariant<
  'white' | 'orange',
  'yellow'
>;
export type ButtonSizeVariant = DesignSystemSizeVariant;
