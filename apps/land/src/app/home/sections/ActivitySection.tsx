'use client';

import { cn } from '@clab-platforms/utils';

import { Section } from '@/components';

import { ActivityCard } from '../components';
import { useScrollAnimation } from '../hooks';

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
  );
}
