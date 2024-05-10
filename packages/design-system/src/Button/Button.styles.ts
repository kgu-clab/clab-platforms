import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'rounded-lg border text-sm font-semibold transition-colors',
  {
    variants: {
      color: {
        white: 'border-gray-600 text-gray-600 hover:bg-gray-200',
        orange: 'border-orange-500 text-orange-500 hover:bg-orange-200',
        green: 'border-green-600 text-green-600 hover:bg-green-200',
        red: 'border-red-600 text-red-600 hover:bg-red-200',
        blue: 'border-blue-600 text-blue-600 hover:bg-blue-200',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'p-2',
        lg: 'px-4 py-2',
      },
    },
    defaultVariants: {
      color: 'white',
      size: 'md',
    },
  },
);
