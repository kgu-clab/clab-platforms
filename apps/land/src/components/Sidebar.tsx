'use client';

import { Menubar } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import { PATH } from '@/constants';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  pathname: string;
}

export default function Sidebar({ isOpen, pathname }: SidebarProps) {
  return (
    <aside
      className={cn(
        'bg-clab-gray fixed inset-y-0 top-0 h-fit w-screen p-10 pt-24 transition-transform duration-300 ease-in-out md:hidden',
        isOpen ? 'z-20 translate-y-0' : '-translate-y-full',
      )}
    >
      <Menubar className="flex flex-col text-start text-white" gap="lg">
        <Menubar.Item className="text-white" selected={pathname === PATH.HOME}>
          <Link href={PATH.HOME}>홈</Link>
        </Menubar.Item>
        <Menubar.Item
          className="text-white"
          selected={pathname === PATH.APPLICATION}
        >
          <Link href={PATH.APPLICATION}>지원</Link>
        </Menubar.Item>
        <Menubar.Item className="text-white" selected={pathname === PATH.ASK}>
          <Link href={PATH.ASK}>문의</Link>
        </Menubar.Item>
      </Menubar>
    </aside>
  );
}
