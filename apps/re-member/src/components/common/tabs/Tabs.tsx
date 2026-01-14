import {
  cloneElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/shared/utils/cn";
import { useMatch, useNavigate } from "react-router";
import type { IconBaseProps } from "react-icons";

export interface TabsProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

interface TabsItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  href: string;
}

export default function Tabs({ className, children, ...props }: TabsProps) {
  return (
    <header
      className={cn(
        "px-gutter gap-lg box-border flex w-full shrink-0",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

function TabsItem({ className, icon, label, href, ...props }: TabsItemProps) {
  const isActive = useMatch(href);
  const navigate = useNavigate();

  return (
    <button
      className={cn(
        "gap-md pb-sm flex cursor-pointer items-center justify-center border-b-2 border-transparent focus:outline-none",
        className,
        isActive && "border-primary",
      )}
      onClick={() => navigate(href)}
      {...props}
    >
      <span className={cn("text-gray-300", isActive && "text-primary")}>
        {cloneElement(icon as ReactElement<IconBaseProps>, {
          size: 16,
        })}
      </span>
      <span
        className={cn(
          "font-size-18 font-semibold text-gray-300",
          isActive && "text-primary",
        )}
      >
        {label}
      </span>
    </button>
  );
}

Tabs.Item = TabsItem;
