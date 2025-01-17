'use client';

import { useState } from 'react';

import { ArrowRightUpSolid } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { Section } from '@/components';
import { FAQ, PATH } from '@/constants';
import Link from 'next/link';

export default function FAQSection() {
  const [open, setOpen] = useState(
    Array.from({ length: FAQ.length }).fill(false),
  );

  const handleQuestionClick = (index: number) => {
    setOpen((prev) => {
      const updateOpen = [...prev];
      updateOpen[index] = !updateOpen[index];
      return updateOpen;
    });
  };

  return (
    <Section>
      <p className="mb-4 text-5xl font-bold">FAQ</p>
      <p className="text-clab-dark-yellow mb-8 text-2xl font-bold">
        자주 묻는 질문들이에요.
      </p>
      <div className="w-full space-y-6 px-8 md:px-64">
        {FAQ.map(({ id, question, answer }) => (
          <div
            key={id}
            className="bg-clab-light-gray break-keep rounded-lg p-4 hover:cursor-pointer md:p-6"
            onClick={() => handleQuestionClick(id)}
          >
            <p className="text-lg font-bold md:text-xl">
              {id}. {question}
            </p>
            <div
              className={cn(
                'mt-8 leading-loose transition-all duration-300 ease-in-out',
                open[id]
                  ? 'opacity-100'
                  : 'absolute h-0 overflow-hidden opacity-0',
              )}
            >
              {answer}
            </div>
          </div>
        ))}
      </div>
      <p className="text-clab-dark-yellow my-16 flex text-xl font-bold md:text-2xl">
        추가적인 질문이 있으시다면
        <Link href={PATH.ASK} scroll={false}>
          <span className="ml-2 flex text-2xl font-bold text-white underline underline-offset-4">
            문의하러 가기
            <ArrowRightUpSolid width={32} height={32} />
          </span>
        </Link>
      </p>
    </Section>
  );
}
