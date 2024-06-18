import { LuLoader2 } from 'react-icons/lu';

import { cn } from '@clab/utils';

interface LoadingProps {
  size?: number;
  className?: string;
}

const Loading = ({ size = 18, className }: LoadingProps) => {
  return <LuLoader2 size={size} className={cn('animate-spin', className)} />;
};

export default Loading;
