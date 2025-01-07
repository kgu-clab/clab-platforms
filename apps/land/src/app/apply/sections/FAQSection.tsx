'use client';

import { useState } from 'react';

import { ArrowRightUpSolid } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { Section } from '@/components';
import { PATH } from '@/constants';
import Link from 'next/link';

const Question = [
  {
    question: '모집 인원은 몇 명인가요?',
    answer:
      ' 신규 모집의 경우, C-Lab은 학우들의 학습을 지원하기 위해 새로운 멤버의 수를 특별히 제한하고 있지 않아요. 열정을 가지고 활발하게 참여할 수 있는 사람을 찾고 있어요. 그러나 동아리 운영에 지장을 주거나 학습 분위기를 해치는 행위가 발생한다면, 해당 멤버는 동아리에서 제명될 수도 있어요. 다른 모집 단위의 경우, 인원이 명시되면 해당 인원 수에 맞춰 선발하지만, 우수한 지원자가 다수인 경우 더 많은 인원을 선발할 수도 있어요. 하지만 반대의 경우, 해당 인원보다 적게 뽑히는 경우도 생길 수 있어요.',
  },
  {
    question: '면접에선 어떤 것들을 물어보나요?',
    answer: '',
  },
  {
    question: '타학과/복수전공/휴학생도 지원이 가능한가요?',
    answer: '',
  },
  {
    question: '기초적인 실력을 가추고 있어야만 지원이 가능할까요?',
    answer: '',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(
    Array.from({ length: Question.length }).fill(false),
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
        {Question.map(({ question, answer }, index) => (
          <div
            key={index}
            className="bg-clab-light-gray break-keep rounded-lg p-4 hover:cursor-pointer md:p-6"
            onClick={() => handleQuestionClick(index)}
          >
            <p className="text-lg font-bold md:text-xl">
              {index + 1}. {question}
            </p>
            <div
              className={cn(
                'mt-8 leading-loose transition-all duration-300 ease-in-out',
                open[index]
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
