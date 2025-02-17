import { cn } from '@clab-platforms/utils';

import type { Review } from '@/types';
import Image from 'next/image';

interface ReviewCardProps extends Review {
  isVisible: boolean;
}

export default function ReviewCard({
  description,
  writer,
  meta,
  id,
  isVisible,
  color,
  imageSrc,
}: ReviewCardProps) {
  return (
    <div
      id={`review-card-${id}`}
      className={cn(
        'review-card transition-all duration-300',
        isVisible ? 'translate-y-0 scale-110' : 'translate-y-18 scale-100',
      )}
    >
      <div
        className={cn(
          'rounded-xl bg-white p-6 text-black transition-all duration-300',
          isVisible && color,
        )}
      >
        <div className="mb-4 flex space-x-2">
          <Image
            src={imageSrc}
            alt="C-Lab"
            width={40}
            height={40}
            className="size-[40px] rounded-full object-cover"
          />
          <p className="text-start font-bold">
            {writer[0]}**
            <span className="block text-sm text-gray-500">{meta}</span>
          </p>
        </div>
        <p className={cn(isVisible && 'font-bold')}>{description}</p>
      </div>
    </div>
  );
}
