import { LuLoader2 } from 'react-icons/lu';

import classNames from 'classnames';

interface LoadingProps {
  size?: number;
  className?: string;
}

const Loading = ({ size = 18, className }: LoadingProps) => {
  return (
    <LuLoader2 size={size} className={classNames('animate-spin', className)} />
  );
};

export default Loading;
