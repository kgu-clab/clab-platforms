'use client';

import { useEffect, useState } from 'react';

import { Section } from '@/components';
import { REVIEW } from '@/constants/review';

import ReviewCard from '../components/ReviewCard';

export default function ReviewSection() {
  const [visibleCard, setVisibleCard] = useState<number | null>(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.review-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.id.split('-')[2]);

          if (entry.isIntersecting) {
            setVisibleCard(cardId);
          }
        });
      },
      { threshold: 0.8 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <Section className="items-end bg-gray-200 p-16 text-black lg:px-72 lg:py-32">
      <div className="mb-24 flex flex-col space-y-2 text-right">
        <h2 className="text-4xl font-bold md:text-6xl">REVIEW</h2>
        <p className="text-xl md:text-3xl">
          구성원이 전하는 생생한
          <span className="text-clab-blue font-bold"> 후기</span>
          예요.
        </p>
      </div>

      <div className="grid grid-rows-1 items-center gap-16">
        {REVIEW.map(({ id, description, writer, meta, color }) => (
          <ReviewCard
            key={id}
            id={id}
            description={description}
            writer={writer}
            meta={meta}
            isVisible={visibleCard === id}
            color={color}
          />
        ))}
      </div>
    </Section>
  );
}
