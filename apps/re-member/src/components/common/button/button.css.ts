import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariant = cva(
  "focus:outline-none cursor-pointer flex justify-center items-center w-full active:brightness-90",
  {
    variants: {
      size: {
        large: "h-[52px] rounded-lg font-16 font-semibold",
        small:
          "h-[33px] rounded-full text-[14px] w-fit font-medium px-lg py-md",
      },
      color: {
        dark: "bg-black text-white",
        active: "bg-primary text-white",
        disabled: "bg-gray-2 text-gray-4 active:brightness-100",
        outlineActive: "border border-primary bg-primary/10 text-primary",
        outlineDisabled:
          "border border-gray-3 text-gray-3 bg-gray-1 active:brightness-100",
        ghost: "bg-transparent text-gray-3 ",
        text: "bg-transparent text-black ",
      },
    },
    defaultVariants: {
      size: "large",
      color: "active",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariant>;
export type ButtonSize = ButtonVariants["size"];
export type ButtonColor = ButtonVariants["color"];
