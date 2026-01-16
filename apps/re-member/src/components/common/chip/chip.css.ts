import { cva, type VariantProps } from "class-variance-authority";

export const chipVariant = cva(
  "focus:outline-none flex items-center justify-center px-md py-sm text-[12px] font-medium leading-[1.5] shrink-0 w-fit rounded-full",
  {
    variants: {
      color: {
        red: "bg-chip-red/10 text-chip-red",
        yellow: "bg-chip-yellow/10 text-chip-yellow",
        green: "bg-chip-green/10 text-chip-green",
        purple: "bg-chip-purple/10 text-chip-purple",
        primary: "bg-primary/10 text-primary",
        disabled: "bg-gray-2 text-gray-4",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  },
);

export type ChipVariants = VariantProps<typeof chipVariant>;
export type ChipColor = ChipVariants["color"];
