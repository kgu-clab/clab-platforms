'use client';

import { INFORMATION_URL } from '@/constants';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-clab-gray flex min-h-56 justify-between px-20 py-12">
      <div className="flex flex-col justify-between">
        <Image src="/favicon.ico" width={56} height={56} alt="C-Lab" />
        <ul className="space-y-1 text-sm">
          <p>Developed By C-Lab CoreTeam</p>
          <p>© C-Lab. All rights reserved.</p>
        </ul>
      </div>
      <a href={INFORMATION_URL.GITHUB} target="_blank">
        <Image
          src="/github-mark-white.svg"
          width={40}
          height={40}
          alt="C-Lab"
        />
      </a>
    </footer>
  );
}
