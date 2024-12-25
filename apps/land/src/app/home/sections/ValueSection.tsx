'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { LeftArrowSolid, RightArrowSolid } from '@clab-platforms/icon';

import { Section } from '@/components';
import { VALUES } from '@/constants';

import { ValueCircle } from '../components';

export default function ValueSection() {
  const [value, setValue] = useState(0);
  const valueRef = useRef<HTMLDivElement | null>(null);
  const [isValueScroll, setIsValueScroll] = useState(false);

  const handleHorizontalScroll = useCallback(
    (e: WheelEvent) => {
      if (!isValueScroll || !valueRef.current || window.innerWidth < 768)
        return;

      const container = valueRef.current;
      container.scrollLeft += e.deltaY;

      e.preventDefault();

      if (
        container.scrollLeft + container.clientWidth >= container.scrollWidth ||
        container.scrollLeft <= 0
      ) {
        setIsValueScroll(false);
      }
    },
    [isValueScroll],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsValueScroll(true);
        } else {
          setIsValueScroll(false);
        }
      },
      { threshold: 0.7 },
    );

    if (valueRef.current) {
      observer.observe(valueRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isValueScroll) {
      window.addEventListener('wheel', handleHorizontalScroll, {
        passive: false,
      });
    } else {
      window.removeEventListener('wheel', handleHorizontalScroll);
    }

    return () => window.removeEventListener('wheel', handleHorizontalScroll);
  }, [isValueScroll, handleHorizontalScroll]);

  return (
    <Section className="mb-12 items-start">
      <div className="mb-12 flex flex-col space-y-2 px-12 text-start md:mb-24 md:pl-40">
        <h2 className="text-4xl font-bold md:text-6xl">VALUE</h2>
        <p className="text-xl md:text-3xl">
          C-Lab에서 추구하는 <span className="text-clab-light-blue">가치</span>
          를 소개해요.
        </p>
      </div>

      <div
        ref={valueRef}
        className="scrollbar-hide flex size-full flex-wrap justify-center md:justify-start md:overflow-scroll md:overflow-y-hidden md:p-12 md:px-64"
      >
        <div className="hidden space-x-12 md:flex">
          {VALUES.map(({ keyword, description }) => (
            <ValueCircle
              key={keyword}
              keyword={keyword}
              description={description}
            />
          ))}
        </div>
        <div className="flex items-center gap-8 p-2 pt-12 md:hidden">
          <LeftArrowSolid
            width={36}
            height={36}
            onClick={() => setValue(value > 0 ? value - 1 : VALUES.length - 1)}
          />
          <ValueCircle
            key={VALUES[value].keyword}
            keyword={VALUES[value].keyword}
            description={VALUES[value].description}
          />
          <RightArrowSolid
            width={36}
            height={36}
            onClick={() => setValue(value < VALUES.length - 1 ? value + 1 : 0)}
          />
        </div>
      </div>
    </Section>
  );
}
