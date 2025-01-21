'use client';

import { cn } from '@clab-platforms/utils';

import { Section } from '@/components';

import { ActivityCard } from '../components';
import { useScrollAnimation } from '../hooks';

const ActivityData = [
  {
    title: 'MT',
    image: '/activity/activity_photo1.jpeg',
  },
  {
    title: '네트워킹 데이',
    image: '/activity/activity_photo2.jpeg',
  },
  {
    title: '회식',
    image: '/activity/activity_photo3.jpeg',
  },
  {
    title: '1학년 C언어 스터디',
    image: '/activity/activity_photo4.jpeg',
  },
];

export default function ActivitySection() {
  const isVisibleActivity = useScrollAnimation('scroll-fade-activity');

  return (
    <Section className="bg-gradient-to-t from-gray-200">
      <div className="mb-32 flex flex-col space-y-2 px-12 md:text-center">
        <h2 className="text-4xl font-bold md:text-6xl">ACTIVITY</h2>
        <p className="text-xl md:text-3xl">
          다양한 도전과 노력들, 구성원들과
          <span className="text-clab-blue"> 교류</span>하며 성장해요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 overflow-hidden px-12 md:!grid-cols-2 md:gap-0 md:gap-x-20 lg:px-40">
        {ActivityData.map(({ title, image }, index) => (
          <ActivityCard
            key={title}
            title={title}
            image={image}
            className={cn(
              'scroll-fade-activity',
              isVisibleActivity ? 'visible' : '',
              index % 2 !== 0 && 'text-end md:mt-64',
            )}
          />
        ))}
      </div>
    </Section>
  );
}
