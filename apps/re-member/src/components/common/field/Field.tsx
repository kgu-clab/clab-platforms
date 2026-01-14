import { cn } from "@/shared/utils/cn";
import type { HTMLAttributes } from "react";

export interface FieldProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
}

export default function Field({
  className,
  title,
  description,
  ...props
}: FieldProps) {
  return (
    <p className={cn("text-14-medium gap-xs flex", className)} {...props}>
      <span className="text-gray-400">{title}</span>
      <span className="text-black">{description}</span>
    </p>
  );
}
