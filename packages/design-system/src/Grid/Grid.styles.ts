import { cva } from 'cva';

export const gridVariants = cva({
  base: 'grid',
  variants: {
    col: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
      '10': 'grid-cols-10',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    col: '1',
    gap: 'none',
  },
});
