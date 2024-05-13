import { cva } from 'cva';

export const menubarVariants = cva({
  base: 'flex font-semibold text-gray-400',
  variants: {
    gap: {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-8',
      xl: 'gap-10',
    },
  },
  defaultVariants: {
    gap: 'md',
  },
});

export const menubarItemVariants = cva({
  base: 'cursor-pointer transition-colors hover:text-black',
  variants: {
    selected: {
      true: 'text-black underline underline-offset-4',
    },
  },
  defaultVariants: {
    selected: false,
  },
});
