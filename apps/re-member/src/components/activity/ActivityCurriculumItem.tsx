import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";
import { IoChevronForward } from "react-icons/io5";

export interface ActivityCurriculumItemProps
  extends HTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function ActivityCurriculumItem({
  label,
  className,
  ...props
}: ActivityCurriculumItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "bg-gray-0 border-gray-2 p-xl flex w-full items-start justify-between rounded-md border",
        className,
      )}
      {...props}
    >
      <p className="text-15-medium text-gray-5">{label}</p>
      <IoChevronForward size={16} className="text-gray-5" />
    </button>
  );
}
