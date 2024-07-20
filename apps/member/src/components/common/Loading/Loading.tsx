import { LoaderOutline } from '@clab/icon';
import { cn } from '@clab/utils';

interface LoadingProps {
  size?: number;
  className?: string;
}

const Loading = ({ size = 18, className }: LoadingProps) => {
  return (
    <LoaderOutline
      width={size}
      height={size}
      className={cn('animate-spin', className)}
    />
  );
};

export default Loading;
