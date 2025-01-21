import { cn } from '@clab-platforms/utils';

import Image from 'next/image';

interface ActivityCardProps {
  title: string;
  image: string;
  className?: string;
}

export default function ActivityCard({
  title,
  image,
  className,
}: ActivityCardProps) {
  return (
    <div
      className={cn('lg:max-w-1/3 w-full space-y-2 overflow-hidden', className)}
    >
      <p className="text-2xl font-bold">{title}</p>
      <Image
        className="rounded-md object-cover"
        width={560}
        height={420}
        src={image}
        alt={title}
        style={{ width: '560', height: '420' }}
      />
    </div>
  );
}
