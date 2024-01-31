import Link from 'next/link';
import React from 'react';

const HelpLink = () => {
  return (
    <Link
      href="https://www.clab.page/ask"
      className="text-center text-sm text-gray-500 hover:text-black"
    >
      문제가 생기셨나요?&nbsp;
      <span className="underline decoration-purple-500 after:content-['_↗']">
        문의하러가기
      </span>
    </Link>
  );
};

export default HelpLink;
