'use client';

import { useEffect, useRef, useState } from 'react';

import { MenuOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { INFORMATION_URL, PATH } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Sidebar from './Sidebar';

export default function Nav() {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleBackgroundClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="bg-clab-gray fixed inset-0 z-20 opacity-70"
          onClick={handleBackgroundClick}
        />
      )}

      <nav
        className={cn(
          'bg-clab-gray fixed top-0 z-30 w-full transition-transform',
          {
            '-translate-y-full': !scrollingUp,
          },
        )}
      >
        <div className="flex place-items-center justify-between px-8 py-2 md:px-20">
          <Link href={PATH.HOME} scroll={false}>
            <Image src="/favicon.ico" width={48} height={48} alt="C-Lab" />
          </Link>
          <div className="hidden space-x-8 md:flex">
            <Link
              href={PATH.APPLY}
              className={cn('underline-offset-8 hover:underline', {
                'font-bold underline underline-offset-8':
                  pathname === PATH.APPLY,
              })}
              scroll={false}
            >
              지원
            </Link>
            <Link
              href={PATH.ASK}
              className={cn('underline-offset-8 hover:underline', {
                'font-bold underline underline-offset-8': pathname === PATH.ASK,
              })}
              scroll={false}
            >
              문의
            </Link>
            <div className="space-x-2">
              <Link
                className="bg-clab-yellow border-clab-yellow text-clab-yellow rounded-full border bg-opacity-30 px-4 py-2 text-sm hover:bg-opacity-0"
                href={INFORMATION_URL.MEMBERS}
                target="_blank"
                scroll={false}
              >
                VISIT MEMBERS
              </Link>
              <Link
                className="bg-clab-yellow border-clab-yellow text-clab-yellow rounded-full border bg-opacity-30 px-4 py-2 text-sm hover:bg-opacity-0"
                href={PATH.RESULT}
                scroll={false}
              >
                합격 확인
              </Link>
            </div>
          </div>
          <MenuOutline
            width={20}
            height={20}
            className="hover:cursor-pointer md:hidden"
            onClick={handleSidebarOpen}
          />
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} pathname={pathname} />
    </>
  );
}
