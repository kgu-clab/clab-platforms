import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-clab-primary xs:p-10 w-full p-5 text-white">
      <div>
        <p className="text-3xl font-bold">C-Lab</p>
        <p className="mt-2">경기대학교 컴퓨터공학부 개발보안동아리</p>
      </div>
      <div className="my-2">
        <p>Developed By C-Lab Core Team</p>
        <p className="mt-1">
          김관식, 한관희, 김가을, 이한음, 김정은, 전민주, 신현호, 송재훈
        </p>
        <p className="mt-1 font-bold">© C-Lab. All rights reserved.</p>
      </div>
      <Link href="https://github.com/kgu-clab" target="_blank">
        <Image
          src="/svg/github.svg"
          width={32}
          height={32}
          alt="깃허브 아이콘"
        />
      </Link>
    </div>
  );
}
