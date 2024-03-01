import { PropsWithChildren } from 'react';

const Hr = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center text-sm text-center text-gray-400">
      <hr className="mx-2 grow" />
      <span className="px-2">{children}</span>
      <hr className="mx-2 grow" />
    </div>
  );
};

export default Hr;
