import React from 'react';

import { UserOutline } from '@clab-platforms/icon';

import { PATH } from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  <Link key={PATH.HOME} href={PATH.HOME}>
    홈
  </Link>,
  <Link key={PATH.TIMETABLE} href={PATH.TIMETABLE}>
    시간표
  </Link>,
  <Link key={PATH.GRADE} href={PATH.GRADE}>
    학점
  </Link>,
  <Link key={PATH.LIBRARY} href={PATH.LIBRARY}>
    도서관
  </Link>,
  <Link key={PATH.LOST} href={PATH.LOST}>
    분실물
  </Link>,
  <Link key={PATH.FOOD} href={PATH.FOOD}>
    학식
  </Link>,
] as const;

const actions = [
  <button key={PATH.MY}>
    <UserOutline width={20} height={20} />
  </button>,
] as const;

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full border-b bg-white">
      <div className="container flex h-14 items-center justify-between text-nowrap">
        <div className="flex items-center gap-2 sm:w-1/5">
          <Image
            src="/favicon.ico"
            alt="c-lab"
            width={200}
            height={200}
            className="size-8"
          />
          <Link href="/">
            <h1 className="select-none text-xl font-semibold">경기플러스</h1>
          </Link>
        </div>
        <ul className="hidden w-3/5 items-center justify-center gap-4 text-sm sm:flex">
          {links.map((link) => link)}
        </ul>
        <div className="flex items-center justify-end gap-4 text-sm sm:w-1/5">
          {actions.map((action) => action)}
        </div>
      </div>
    </nav>
  );
}
