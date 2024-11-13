'use client';

import { Button } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import { MEMBERS_URL } from '@/app/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b-clab-gray top-0 w-full border-b">
      <div className="flex place-items-center justify-between px-20 py-2">
        <Image src="/favicon.ico" width={48} height={48} alt="C-Lab" />
        <div className="space-x-8">
          <Link
            href="/application"
            className={cn('hover:underline', {
              'font-bold': pathname === '/application',
            })}
          >
            지원
          </Link>
          <Link
            href="/ask"
            className={cn('hover:underline', {
              'font-bold': pathname === '/ask',
            })}
          >
            문의
          </Link>
          <Button
            className="bg-clab-yellow border-clab-yellow text-clab-yellow rounded-full bg-opacity-30 px-3"
            onClick={() =>
              window.open(MEMBERS_URL, '_blank', 'noopener noreferrer')
            }
          >
            VISIT MEMBERS
          </Button>
        </div>
      </div>
    </nav>
  );
}
