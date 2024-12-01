'use client';

import { cn } from '@clab-platforms/utils';

import PageLayout from '@/app/PageLayout';
import { Section } from '@/components';
import { KEYWORDS, PATH, VALUES } from '@/constants';
import Link from 'next/link';

import { ActivityCard, ValueCircle } from './components';
import TextSlider from './components/TextSlider';
import { useScrollAnimation } from './hooks';

export default function Home() {
  const isVisibleInfo = useScrollAnimation('scroll-fade-info');
  const isVisibleActivity = useScrollAnimation('scroll-fade-activity');

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
            'scroll-fade-info mx-4 whitespace-pre-wrap px-4 text-xl leading-loose md:text-3xl md:leading-normal lg:px-72',
            isVisibleInfo ? 'visible' : '',
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
        <div className="mb-24 flex flex-col space-y-2 px-12 text-start md:pl-40">
          <h2 className="text-4xl font-bold md:text-6xl">VALUE</h2>
          <p className="text-xl md:text-3xl">
            C-Lab에서 추구하는 <span className="text-clab-yellow">가치</span>를
            소개해요.
          </p>
        </div>

        <div className="flex size-full flex-wrap overflow-scroll p-12 md:px-64">
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
      <Section>
        <div className="mb-32 flex flex-col space-y-2 md:text-center lg:px-12">
          <h2 className="text-4xl font-bold md:text-6xl">ACTIVITY</h2>
          <p className="text-xl md:text-3xl">
            다양한 도전과 노력들, 구성원들과
            <span className="text-clab-yellow"> 교류</span>하며 성장해요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 px-12 md:grid-cols-2 md:gap-0 md:gap-x-20 lg:px-40">
          <ActivityCard
            title="스터디"
            image="/clab_picture.jpeg"
            className={cn(
              isVisibleActivity ? 'visible' : '',
              'scroll-fade-activity',
            )}
          />
          <ActivityCard
            title="프로젝트"
            image="/clab_picture.jpeg"
            className={cn(
              isVisibleActivity ? 'visible' : '',
              'scroll-fade-activity text-end md:mt-64',
            )}
          />
          <ActivityCard
            title="MT"
            image="/clab_picture.jpeg"
            className={cn(
              isVisibleActivity ? 'visible' : '',
              'scroll-fade-activity',
            )}
          />
          <ActivityCard
            title="네트워킹 데이"
            image="/clab_picture.jpeg"
            className={cn(
              isVisibleActivity ? 'visible' : '',
              'scroll-fade-activity text-end md:mt-64',
            )}
          />
        </div>
      </Section>
    </PageLayout>
  );
}
