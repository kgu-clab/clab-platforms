'use client';

import { cn } from '@clab-platforms/utils';

import { Section } from '@/components';

import { useScrollAnimation } from '../hooks';

export default function DescriptionSection() {
  const isVisibleInfo = useScrollAnimation('scroll-fade-info');

  return (
    <Section>
      <p
        className={cn(
          'scroll-fade-info mx-4 whitespace-pre-wrap px-4 text-xl leading-loose md:!px-32 md:!text-3xl md:!leading-normal',
          isVisibleInfo ? 'visible' : '',
        )}
      >
        <span className="text-3xl font-bold md:text-5xl">C-Lab</span>은
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
  );
}
