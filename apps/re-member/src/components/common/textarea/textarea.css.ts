import { cva, type VariantProps } from "class-variance-authority";

export const textareaWrapperVariant = cva(
  "relative bg-gray-0 border border-gray-2 rounded-md p-xl",
  {
    variants: {
      size: {
        default: "min-h-[209px]",
        small: "min-h-[120px]",
        large: "min-h-[300px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const textareaInputVariant = cva(
  "text-[15px] font-regular leading-[1.5] placeholder:text-gray-3 bg-transparent w-full resize-none focus:outline-none focus:text-black",
  {
    variants: {
      size: {
        default: "h-[145px]",
        small: "h-[80px]",
        large: "h-[240px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type TextareaWrapperVariants = VariantProps<
  typeof textareaWrapperVariant
>;
export type TextareaInputVariants = VariantProps<typeof textareaInputVariant>;
export type TextareaSize = TextareaWrapperVariants["size"];
