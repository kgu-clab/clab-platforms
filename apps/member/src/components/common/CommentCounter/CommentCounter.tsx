import { PropsWithChildren } from 'react';

interface CommentCounterProps extends PropsWithChildren {}

const CommentCounter = ({ children }: CommentCounterProps) => {
  if (typeof children !== 'number') {
    return null;
  }

  return <span className="font-medium text-red-500">{` [${children}]`}</span>;
};

export default CommentCounter;
