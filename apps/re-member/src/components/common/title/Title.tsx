import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export interface TitleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export default function Title({ className, children, ...props }: TitleProps) {
  return (
    <div className={cn("text-20-semibold", className)} {...props}>
      {children}
    </div>
  );
}
