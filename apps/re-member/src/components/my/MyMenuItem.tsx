import type { IconType } from "react-icons";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router";

interface MenuItemProps {
  to: string;
  label: string;
  icon: IconType;
}

export default function MyMenuItem({ to, label, icon }: MenuItemProps) {
  return (
    <Link
      to={to}
      className="border-b-gray-2 py-lg flex items-center justify-between border-b"
    >
      <div className="gap-lg flex items-center">
        <div className="bg-gray-1 flex size-9 items-center justify-center rounded-md">
          {icon({ className: "text-black size-5" })}
        </div>
        <span className="text-16-regular text-black">{label}</span>
      </div>
      <IoChevronForward className="text-gray-4" />
    </Link>
  );
}
