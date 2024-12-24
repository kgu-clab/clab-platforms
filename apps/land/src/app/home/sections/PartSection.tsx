'use client';

import { useState } from 'react';

import { Button } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import { Section } from '@/components';
import { PART } from '@/constants/part';
import type { Part } from '@/types';

import { PartCard } from '../components';

export default function PartSection() {
  const [part, setPart] = useState<Part>(PART[0]);

  const handlePartButtonClick = (id: number) => {
    setPart(PART[id - 1]);
  };

  return (
    <Section className="mb-40 items-center sm:p-24 sm:pt-20 lg:p-48">
      <div className="mb-24 flex flex-col space-y-2 text-center">
        <h2 className="text-4xl font-bold sm:text-6xl">PART</h2>
        <p className="text-xl sm:text-3xl">
          C-Lab의 <span className="text-clab-yellow">구성 요소</span>를
          소개해요.
        </p>
      </div>

      <div className="px-8 sm:hidden">
        <div className="mb-8 flex justify-between">
          {PART.map(({ name, id }) => (
            <Button
              key={id}
              onClick={() => handlePartButtonClick(id)}
              color="gray"
              className={cn(
                'px-6',
                part.id === id
                  ? 'bg-gray-200 font-bold text-black'
                  : 'bg-transparent',
              )}
            >
              {name}
            </Button>
          ))}
        </div>
        <PartCard description={part.description} name={part.name} />
      </div>

      <div className="mx-12 hidden grid-cols-1 gap-8 sm:mx-0 sm:grid sm:grid-cols-2">
        {PART.map(({ id, name, description }) => (
          <PartCard key={id} description={description} name={name} />
        ))}
      </div>
    </Section>
  );
}
