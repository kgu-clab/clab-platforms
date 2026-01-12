import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../shared/utils/cn";
import { chipVariant, type ChipColor } from "./chip.css";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  color?: Exclude<ChipColor, null>;
  children: ReactNode;
}

export default function Chip({
  color,
  children,
  className,
  ...props
}: ChipProps) {
  return (
    <div className={cn(chipVariant({ color }), className)} {...props}>
      {children}
    </div>
  );
}
