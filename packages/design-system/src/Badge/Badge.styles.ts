import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'text-nowrap rounded px-2 py-0.5 text-sm font-medium',
  {
    variants: {
      color: {
        primary: 'bg-clab-primary/10 text-clab-primary',
        secondary: 'bg-clab-secondary/10 text-clab-secondary',
        red: 'bg-red-500/10 text-red-500',
        orange: 'bg-orange-500/10 text-orange-500',
        yellow: 'bg-yellow-500/10 text-yellow-500',
        green: 'bg-green-500/10 text-green-500',
        blue: 'bg-blue-500/10 text-blue-500',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);
