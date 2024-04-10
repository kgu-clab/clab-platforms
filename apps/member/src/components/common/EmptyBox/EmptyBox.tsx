import { StrictPropsWithChildren } from '@type/component';

interface EmptyBoxProps extends StrictPropsWithChildren {}

const EmptyBox = ({ children }: EmptyBoxProps) => {
  return <p className="w-full text-center text-gray-500">{children}</p>;
};

export default EmptyBox;
