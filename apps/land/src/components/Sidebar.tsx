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
        'bg-clab-yellow-gray fixed inset-y-0 right-0 top-0 mt-16 h-screen w-1/3 p-6 transition-transform duration-300 ease-in-out md:hidden',
        isOpen ? 'z-20 translate-x-0' : 'translate-x-full',
      )}
    >
      <Menubar className="flex flex-col text-start" gap="lg">
        <Menubar.Item>
          <Link
            href={PATH.HOME}
            className={cn('hover:underline', {
              'font-bold': pathname === PATH.HOME,
            })}
          >
            홈
          </Link>
        </Menubar.Item>
        <Menubar.Item>
          <Link
            href={PATH.APPLICATION}
            className={cn('hover:underline', {
              'font-bold': pathname === PATH.APPLICATION,
            })}
          >
            지원
          </Link>
        </Menubar.Item>
        <Menubar.Item>
          <Link
            href={PATH.ASK}
            className={cn('hover:underline', {
              'font-bold': pathname === PATH.ASK,
            })}
          >
            문의
          </Link>
        </Menubar.Item>
      </Menubar>
    </aside>
  );
}
