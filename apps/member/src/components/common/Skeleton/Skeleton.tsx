import { cn } from '@clab-platforms/utils';

interface SkeletonProps {
  size?: string;
  width?: string;
  height?: string;
  className?: string;
  repeat?: number;
}

const Skeleton = ({
  size,
  width,
  height,
  className,
  repeat = 1,
}: SkeletonProps) => {
  if (size) {
    width = size;
    height = size;
  }

  return Array.from({ length: repeat }).map((_, index) => (
    <div
      key={index}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={cn(
        'animate-pulse rounded-lg bg-gray-200',
        { 'w-full': !width, 'h-full': !height },
        className,
      )}
    />
  ));
};

export default Skeleton;
