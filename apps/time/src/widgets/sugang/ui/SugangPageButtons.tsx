'use client';

import React, { useState } from 'react';

export default function SugangPageButtons() {
  const [selected, setSelected] = useState(0);
  const sugangPages: string[] = [
    '소망가방',
    '교양',
    '전공',
    '연계(융합)',
    '외국어과목',
    '외국인전용',
  ];
  return (
    <>
      <div className="flex text-sm">
        {sugangPages.map((page, index) => (
          <button
            onClick={() => setSelected(index)}
            key={index}
            className={`w-24 p-2 text-center ${selected === index ? 'bg-white' : 'bg-gray-200 text-gray-400'}`}
          >
            {page}
          </button>
        ))}
      </div>
      <hr className="border-black/20" />
    </>
  );
}
