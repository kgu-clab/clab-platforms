import type { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/shared/utils/cn";

export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "center" | "end";
}

export interface DropdownItemProps {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  shortcut?: string;
  destructive?: boolean;
}

export default function Dropdown({
  trigger,
  children,
  align = "center",
}: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            "z-50 min-w-[200px] rounded-lg bg-white p-1 shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
          align={align}
          sideOffset={5}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function DropdownItem({
  children,
  onSelect,
  disabled,
  shortcut,
  destructive,
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      className={cn(
        "text-14-medium flex cursor-pointer items-center justify-between rounded-md px-3 py-2 outline-none",
        "hover:bg-gray-100 focus:bg-gray-100",
        destructive && "text-red-600 hover:bg-red-50 focus:bg-red-50",
        disabled && "cursor-not-allowed opacity-50",
      )}
      onSelect={onSelect}
      disabled={disabled}
    >
      <span>{children}</span>
      {shortcut && (
        <span className="text-12-regular ml-auto pl-4 text-gray-400">
          {shortcut}
        </span>
      )}
    </DropdownMenu.Item>
  );
}

function DropdownSeparator() {
  return <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />;
}

Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
