'use client';

import { cn } from '@clab-platforms/utils';

import PageLayout from '@/app/PageLayout';
import { Section } from '@/components';
import { KEYWORDS, PATH, VALUES } from '@/constants';
import Link from 'next/link';

import { ValueCircle } from './components';
import TextSlider from './components/TextSlider';
import { useScrollAnimation } from './hooks';

export default function Home() {
  const isVisible = useScrollAnimation();

  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col overflow-hidden"
    >
      <Section className="justify-between">
        <TextSlider keywords={KEYWORDS} direction="right" />
        <div className="flex flex-col space-y-4 text-center">
          <h1 className="text-4xl font-bold leading-normal md:text-6xl md:leading-normal">
            당신의 가치를 찾기 위한 여정
            <br />
            여기 C-Lab에서.
          </h1>
          <Link
            href={PATH.APPLICATION}
            className="bg-clab-yellow border-clab-yellow hover:text-clab-yellow mx-auto rounded-full border px-10 py-2 text-xl font-bold text-black hover:bg-opacity-0"
          >
            JOIN-US
          </Link>
        </div>
        <TextSlider keywords={[...KEYWORDS].reverse()} direction="left" />
      </Section>
      <Section>
        <p
          className={cn(
            'scroll-fade mx-4 whitespace-pre-wrap px-4 text-xl leading-loose md:px-72 md:text-3xl md:leading-normal',
            isVisible ? 'visible' : '',
          )}
        >
          <span className="text-3xl font-bold md:text-5xl ">C-Lab</span>은
          <br />
          경기대학교 AI컴퓨터공학부 학술동아리로 2014년도부터 지금까지 이어지고
          있어요.
          <br />
          <br />
          활발한 스터디, 프로젝트 활동을 통한 구성원 간의 교류로 개인의
          <span className="text-clab-yellow font-bold"> 성장</span>을 이끌어요.
          누적 활동 인원
          <span className="text-clab-blue font-bold"> 200+</span>, 수상 이력
          <span className="text-clab-blue font-bold"> 30+</span>의 결과가 이를
          증명해요.
        </p>
      </Section>
      <Section className="items-start">
        <div className="mb-24 flex flex-col space-y-2 pl-12 text-start md:pl-40">
          <h2 className="text-4xl font-bold md:text-6xl">VALUE</h2>
          <p className="text-xl md:text-3xl">
            C-Lab에서 추구하는 <span className="text-clab-yellow">가치</span>를
            소개해요.
          </p>
        </div>

        <div className="flex size-full flex-wrap overflow-scroll px-12 md:px-64">
          <div className="flex space-x-12">
            {VALUES.map(({ keyword, description }) => (
              <ValueCircle
                key={keyword}
                keyword={keyword}
                description={description}
                flipped={false}
              />
            ))}
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
