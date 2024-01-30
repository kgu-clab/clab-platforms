'use client';

import { REDIRECT } from '@constants/api';
import { useCode } from '@hooks/useCode';
import Link from 'next/link';

const Information = () => {
  const { code } = useCode();

  if (!code) {
    return <div className="font-semibold text-red-500">잘못된 접근입니다.</div>;
  }

  return (
    <div>
      <span>C-Lab 계정으로&nbsp;</span>
      <Link
        href={REDIRECT(code)}
        className="font-semibold text-sky-500 hover:underline"
        target="_blank"
      >
        {code}
      </Link>
      <span>&nbsp;계속하기</span>
    </div>
  );
};

export default Information;
