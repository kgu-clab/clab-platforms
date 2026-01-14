import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonVariant, type ButtonSize, type ButtonColor } from "./button.css";
import { cn } from "@/shared/utils/cn";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "size"> {
  size?: ButtonSize | "small";
  color?: Exclude<ButtonColor, null>;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({
  size,
  color,
  children,
  type = "button",
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariant({ size, color }), className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
