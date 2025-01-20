import type { Executive } from '@/types';
import { getImageUrl, toKoreanExecutivePosition } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends Omit<Executive, 'executiveId'> {}

export default function ExecutiveCard({
  name,
  email,
  interests,
  position,
  imageUrl,
}: Props) {
  return (
    <div className="bg-clab-light-gray flex items-center space-x-4 rounded-lg p-6">
      <Image
        className="flex h-[150px] w-[120px] object-cover"
        width={120}
        height={150}
        src={getImageUrl(imageUrl)}
        alt={name}
      />
      <div className="space-y-4">
        <p className="text-sm font-bold">
          {toKoreanExecutivePosition(position)}
          <span className="ml-2 text-xl">{name}</span>
        </p>
        <p className="text-sm">{interests}</p>
        <p>
          <Link
            scroll={false}
            href={`mailto:${email}`}
            className="text-clab-light-blue underline-offset-4 hover:underline"
          >
            {email}
          </Link>
        </p>
      </div>
    </div>
  );
}
