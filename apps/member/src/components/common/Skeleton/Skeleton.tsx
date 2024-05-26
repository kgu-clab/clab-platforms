import { cn } from '@utils/string';

interface SkeletonProps {
  size?: string;
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton = ({ size, width, height, className }: SkeletonProps) => {
  if (size) {
    width = size;
    height = size;
  }

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={cn(
        'animate-pulse rounded-lg bg-gray-200',
        { 'w-full': !width, 'h-full': !height },
        className,
      )}
    ></div>
  );
};

export default Skeleton;
