import { INFORMATION_URL } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-clab-gray flex min-h-56 justify-between px-8 py-12 md:px-20 ">
      <div className="flex flex-col justify-between">
        <Image src="/favicon.ico" width={56} height={56} alt="C-Lab" priority />
        <ul className="space-y-1 text-sm">
          <p>Developed By C-Lab CoreTeam</p>
          <p>© C-Lab. All rights reserved.</p>
        </ul>
      </div>
      <Link href={INFORMATION_URL.GITHUB} target="_blank">
        <Image
          src="/github-mark-white.svg"
          width={40}
          height={40}
          alt="C-Lab"
        />
      </Link>
    </footer>
  );
}
