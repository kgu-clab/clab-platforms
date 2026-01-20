import type { InputHTMLAttributes } from "react";
import {
  inputWrapperVariant,
  inputVariant,
  dividerVariant,
  type InputVariant,
} from "./input.css";
import { cn } from "@/shared/utils/cn";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  wrapperClassName?: string;
}

export default function Input({
  variant,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn(inputWrapperVariant({ variant }), wrapperClassName)}>
      <input className={cn(inputVariant({ variant }), className)} {...props} />
      <div className={dividerVariant({ variant })} />
    </div>
  );
}
