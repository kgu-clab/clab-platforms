import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'text-nowrap rounded px-2 text-sm font-medium',
  {
    variants: {
      color: {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        red: 'bg-red-100 text-red-600',
        yellow: 'bg-yellow-100 text-yellow-500',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  },
);
