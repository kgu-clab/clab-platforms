'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import { INFORMATION_URL, PATH } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrollingUp, setScrollingUp] = useState(true);
  const pathname = usePathname();
  const beforeScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > beforeScrollY.current) {
        setScrollingUp(false);
      } else {
        setScrollingUp(true);
      }
      beforeScrollY.current = window.scrollY > 0 ? window.scrollY : 0;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        'bg-clab-gray fixed top-0 z-20 w-full transition-transform',
        {
          '-translate-y-full': !scrollingUp,
        },
      )}
    >
      <div className="flex place-items-center justify-between px-20 py-2">
        <Image src="/favicon.ico" width={48} height={48} alt="C-Lab" />
        <div className="space-x-8">
          <Link
            href="/application"
            className={cn('hover:underline', {
              'font-bold': pathname === PATH.APPLICATION,
            })}
          >
            지원
          </Link>
          <Link
            href="/ask"
            className={cn('hover:underline', {
              'font-bold': pathname === PATH.ASK,
            })}
          >
            문의
          </Link>
          <Button
            className="bg-clab-yellow border-clab-yellow text-clab-yellow rounded-full bg-opacity-30 px-4"
            onClick={() =>
              window.open(
                INFORMATION_URL.MEMBERS,
                '_blank',
                'noopener noreferrer',
              )
            }
          >
            VISIT MEMBERS
          </Button>
        </div>
      </div>
    </nav>
  );
}
