import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../shared/utils/cn";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  onClick?: () => void;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export default function Header({
  className,
  left,
  center,
  right,
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn(
        "px-gutter box-border grid h-[60px] w-full grid-cols-[auto_1fr_auto]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center">{left}</div>
      <div className="flex items-center justify-center">{center}</div>
      <div className="flex items-center">{right}</div>
    </header>
  );
}
