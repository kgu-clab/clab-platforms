import type { ButtonColorType, ButtonSizeType } from './Button.types';

export const buttonStyleColored = (color: ButtonColorType): string => {
  return {
    white: 'hover:bg-gray-200 text-gray-600 border-gray-600',
    orange: 'hover:bg-orange-200 text-orange-600 border-orange-600',
    green: 'hover:bg-green-200 text-green-600 border-green-600',
    red: 'hover:bg-red-200 text-red-600 border-red-600',
    blue: 'hover:bg-blue-200 text-blue-600 border-blue-600',
  }[color];
};

export const buttonStyleSized = (size: ButtonSizeType): string => {
  return {
    sm: 'px-2 py-1',
    md: 'p-2',
    lg: 'px-4 py-2',
  }[size];
};
