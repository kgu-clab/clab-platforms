import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'rounded-lg border text-sm font-semibold transition-colors duration-300 ease-in-out',
  {
    variants: {
      color: {
        primary:
          'border-clab-primary text-clab-primary hover:bg-clab-primary/20',
        secondary:
          'border-clab-secondary text-clab-secondary hover:bg-clab-secondary/20',
        red: 'border-red-600 text-red-600 hover:bg-red-600/20',
        orange: 'border-orange-500 text-orange-500 hover:bg-orange-500/20',
        yellow: 'border-yellow-500 text-yellow-500 hover:bg-yellow-500/20',
        green: 'border-green-600 text-green-600 hover:bg-green-600/20',
        blue: 'border-blue-600 text-blue-600 hover:bg-blue-600/20',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'p-2',
        lg: 'px-4 py-2',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
      disabled: false,
    },
  },
);
