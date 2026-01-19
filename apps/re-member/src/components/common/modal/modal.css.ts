import { cva, type VariantProps } from "class-variance-authority";

export const modalBackdropVariant = cva(
  "fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center px-2xl py-xl z-modal-backdrop",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const modalContentVariant = cva(
  "bg-white rounded-xl p-2xl flex flex-col gap-xl w-full max-w-max-width relative z-modal",
  {
    variants: {
      size: {
        default: "max-w-max-width",
        small: "max-w-[400px]",
        large: "max-w-[600px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const modalHeaderVariant = cva("flex flex-col gap-md w-full", {
  variants: {},
  defaultVariants: {},
});

export const modalHeaderTopVariant = cva(
  "flex items-center justify-between w-full",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const modalTitleVariant = cva(
  "text-[14px] font-medium leading-[1.5] text-gray-4",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const modalSubtitleVariant = cva(
  "text-[18px] font-semibold leading-[1.4] text-black",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const modalDescriptionVariant = cva(
  "text-[18px] font-medium leading-[1.4] text-black",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const modalCloseButtonVariant = cva(
  "w-[20px] h-[20px] flex items-center justify-center cursor-pointer",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const modalBodyVariant = cva("flex flex-col gap-xl w-full", {
  variants: {},
  defaultVariants: {},
});

export type ModalContentVariants = VariantProps<typeof modalContentVariant>;
export type ModalContentSize = ModalContentVariants["size"];
