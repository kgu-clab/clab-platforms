import { cloneElement, type ReactElement, type ReactNode } from "react";
import { useMatch, useNavigate } from "react-router";

import { cn } from "@/shared/utils/cn";
import type { IconBaseProps } from "react-icons";
import { BOTTOM_NAVBAR_CONFIG } from "./config";

export interface BottomNavbarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export default function BottomNavbar() {
  return (
    <footer className="h-bottom-navbar-height rounded-t-bottom-navbar shadow-t-md px-2xl py-gutter fixed bottom-0 left-0 right-0 z-50 box-border grid shrink-0 grid-cols-5 border-t border-gray-200 bg-white">
      {BOTTOM_NAVBAR_CONFIG.map((item) => (
        <BottomNavbarItem
          key={item.href}
          icon={item.icon}
          label={item.label}
          href={item.href}
        />
      ))}
    </footer>
  );
}

function BottomNavbarItem({ icon, label, href }: BottomNavbarItemProps) {
  const isActive = useMatch(href);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <button
      className={cn(
        "gap-xs active:text-primary flex flex-col items-center justify-center focus:outline-none",
        isActive ? "text-primary" : "text-gray-300",
      )}
      onClick={handleClick}
    >
      <div>
        {cloneElement(icon as ReactElement<IconBaseProps>, { size: 20 })}
      </div>
      <span className="text-12-regular">{label}</span>
    </button>
  );
}
