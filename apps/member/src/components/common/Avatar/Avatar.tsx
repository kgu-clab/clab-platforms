import { cn } from '@clab-platforms/utils';

import { ROLE_LEVEL } from '@constants/state';
import { createImageUrl } from '@utils/api';

import type { VariantSize } from '@type/component';
import type { RoleLevelType } from '@type/member';

import Image from '../Image/Image';

const SIZE_STYLES = {
  sm: 'size-5',
  md: 'size-10',
  lg: 'size-32',
} as const;

const RING_STYLES: Record<RoleLevelType, string> = {
  0: '',
  1: 'ring-gray-500',
  2: 'ring-purple-500',
  3: 'ring-red-500',
} as const;

interface AvatarProps {
  className?: string;
  src?: string | null;
  size?: Extract<VariantSize, 'sm' | 'md' | 'lg'>;
  roleLevel: RoleLevelType;
}

const Avatar = ({ className, src, size = 'md', roleLevel }: AvatarProps) => {
  const sizeStyled = SIZE_STYLES[size];
  const ringStyled = RING_STYLES[roleLevel ?? ROLE_LEVEL.USER];

  return (
    <div
      className={cn(
        'rounded-full ring ring-offset-1',
        sizeStyled,
        ringStyled,
        className,
      )}
    >
      <Image
        src={createImageUrl(src)}
        alt="avatar"
        width={sizeStyled}
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
