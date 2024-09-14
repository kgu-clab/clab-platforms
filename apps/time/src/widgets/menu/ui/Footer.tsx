import React from 'react';

import { PATH } from '@/shared/constants';
import Link from 'next/link';

const links = [
  {
    name: '이용약관',
    path: PATH.TERMS,
  },
  {
    name: '개인정보처리방침',
    path: PATH.PRIVACY,
  },
  {
    name: '동아리운영규칙',
    path: PATH.RULES,
  },
] as const;

const Footer = () => {
  return (
    <footer className="border-t bg-white p-10 text-center">
      <ul className="flex justify-center divide-x text-sm">
        {links.map(({ name, path }) => (
          <Link key={name} href={path} className="px-2">
            {name}
          </Link>
        ))}
      </ul>
      <div className="mt-2 space-y-1 text-xs font-medium text-gray-400">
        <p className="space-x-1">
          <span>Developed By</span>
          <a href="https://github.com/kgu-clab" target="_blank">
            C-Lab CoreTeam
          </a>
        </p>
        <p>© C-Lab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
