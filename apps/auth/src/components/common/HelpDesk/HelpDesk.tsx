import React from 'react';

import Link from 'next/link';

const HelpDesk = () => {
  return (
    <Link
      href="https://www.clab.page/ask"
      className="text-center text-sm text-gray-500 hover:text-black"
    >
      문제가 생기셨나요?&nbsp;
      <span className="underline decoration-purple-500 underline-offset-4 after:content-['_↗']">
        문의하러가기
      </span>
    </Link>
  );
};

export default HelpDesk;
