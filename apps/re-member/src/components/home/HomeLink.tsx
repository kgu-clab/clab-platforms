import { Link } from "react-router";
import React from "react";

export interface HomeLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function HomeLink({ to, icon, label }: HomeLinkProps) {
  return (
    <Link
      to={to}
      className="bg-gray-0 border-gray-2 gap-md p-lg flex flex-col items-center rounded-xl border"
    >
      <>
        {icon}
        <span className="text-[14px] font-medium leading-normal text-black">
          {label}
        </span>
      </>
    </Link>
  );
}
