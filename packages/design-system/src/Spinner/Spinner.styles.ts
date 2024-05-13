import { cva } from 'cva';

export const spinnerVariants = cva({
  base: 'm-auto animate-spin',
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-5',
      lg: 'size-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
