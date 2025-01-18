'use client';

import { useEffect, useState } from 'react';

import type { Executive } from '@/types/executive';

import { ExecutiveCard } from '../components';
import { useExecutive } from '../hooks';

export default function ExecutiveSection() {
  const { data, isError } = useExecutive();
  const [executiveList, setExecutiveList] = useState<Array<Executive>>([]);

  useEffect(() => {
    if (!isError && data) {
      const sortedExecutiveList = data?.data.reduce(
        (acc: Array<Executive>, executive: Executive) => {
          if (executive.position === 'PRESIDENT') {
            acc.unshift(executive);
          } else if (executive.position === 'VICE_PRESIDENT') {
            acc.splice(1, 0, executive);
          } else {
            acc.push(executive);
          }
          return acc;
        },
        [],
      );
      setExecutiveList(sortedExecutiveList);
    }
  }, [isError, data]);

  return (
    <div>
      <p>C-Lab을 위해 노력하는 운영진을 소개해요.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:!grid-cols-3">
        {executiveList.map(
          ({
            executiveId,
            name,
            email,
            interests,
            position,
            imageUrl,
          }: Executive) => (
            <ExecutiveCard
              key={executiveId}
              name={name}
              email={email}
              interests={interests}
              position={position}
              imageUrl={imageUrl}
            />
          ),
        )}
      </div>
    </div>
  );
}
