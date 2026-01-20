import { cva, type VariantProps } from "class-variance-authority";

export const inputWrapperVariant = cva("flex flex-col w-full", {
  variants: {
    variant: {
      underline: "gap-lg",
      outlined: "gap-0",
      filled: "gap-0",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export const inputVariant = cva(
  "text-15-medium placeholder:text-gray-3 bg-transparent border-0 focus:outline-none focus:text-black w-full",
  {
    variants: {
      variant: {
        underline: "",
        outlined: "border border-gray-2 rounded-md px-xl py-lg",
        filled: "bg-gray-0 border border-gray-2 rounded-md px-xl py-lg",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

export const dividerVariant = cva("", {
  variants: {
    variant: {
      underline: "h-px w-full bg-gray-2",
      outlined: "hidden",
      filled: "hidden",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export type InputWrapperVariants = VariantProps<typeof inputWrapperVariant>;
export type InputVariants = VariantProps<typeof inputVariant>;
export type InputVariant = InputVariants["variant"];
