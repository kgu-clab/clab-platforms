import type { TextareaHTMLAttributes } from "react";
import {
  textareaWrapperVariant,
  textareaInputVariant,
  type TextareaSize,
} from "./textarea.css";
import { cn } from "@/shared/utils/cn";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: TextareaSize;
  showCounter?: boolean;
  wrapperClassName?: string;
}

export default function Textarea({
  size,
  showCounter = false,
  maxLength,
  value,
  className,
  wrapperClassName,
  ...props
}: TextareaProps) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className={cn(textareaWrapperVariant({ size }), wrapperClassName)}>
      <textarea
        className={cn(textareaInputVariant({ size }), className)}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      {showCounter && maxLength && (
        <p className="font-regular text-gray-3 bottom-xl left-xl absolute text-[15px] leading-[1.5]">
          {currentLength} / {maxLength}
        </p>
      )}
    </div>
  );
}
