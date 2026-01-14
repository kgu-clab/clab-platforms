import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import Title from "../title/Title";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title?: string;
}

export default function Section({
  className,
  children,
  title,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("gap-lg flex w-full flex-col", className)}
      {...props}
    >
      {title && <Title>{title}</Title>}
      {children}
    </section>
  );
}

function ListSection({ className, children }: SectionProps) {
  return (
    <div className={cn("flex w-full flex-col gap-[10px]", className)}>
      {children}
    </div>
  );
}

Section.List = ListSection;
