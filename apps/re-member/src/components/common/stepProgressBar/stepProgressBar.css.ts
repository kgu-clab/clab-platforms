import { cva, type VariantProps } from "class-variance-authority";

export const stepProgressBarVariant = cva(
  "flex items-center w-full pt-md pb-0 px-0",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const stepVariant = cva("flex-1 h-[4px] min-h-px min-w-px", {
  variants: {
    status: {
      active: "bg-primary",
      inactive: "bg-gray-2",
    },
  },
  defaultVariants: {
    status: "inactive",
  },
});

export type StepProgressBarVariants = VariantProps<
  typeof stepProgressBarVariant
>;
export type StepVariants = VariantProps<typeof stepVariant>;
export type StepStatus = StepVariants["status"];
