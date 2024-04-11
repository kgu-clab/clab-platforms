import React from 'react';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { PATH } from '@constants/path';

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
  <Link key={PATH.LOST} href={PATH.LOST}>
    학식
  </Link>,
] as const;

const actions = [
  <button key={PATH.MY}>
    <FiUser size={20} />
  </button>,
] as const;

const Nav = () => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b">
      <div className="container flex items-center justify-between h-14 text-nowrap">
        <div className="flex items-center gap-2 sm:w-1/5">
          <img src="/favicon.ico" alt="c-lab" className="size-8" />
          <h1 className="text-xl font-semibold">경기타임</h1>
        </div>
        <ul className="items-center justify-center hidden w-3/5 gap-4 text-sm sm:flex">
          {links.map((link) => link)}
        </ul>
        <div className="flex items-center justify-end gap-4 text-sm sm:w-1/5">
          {actions.map((action) => action)}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
