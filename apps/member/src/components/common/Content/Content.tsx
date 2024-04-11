import React from 'react';

interface ContentProps {
  children?: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div className="w-full space-y-4">{children}</div>;
};

export default Content;
