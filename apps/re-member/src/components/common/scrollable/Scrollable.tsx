import { cn } from "@/shared/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

export interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Scrollable({
  children,
  className,
  ...props
}: ScrollableProps) {
  return (
    <div
      className={cn(
        "scrollbar-hide pb-bottom-padding flex size-full flex-col overflow-y-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
