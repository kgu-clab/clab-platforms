import { SyntheticEvent, useState } from 'react';
import classNames from 'classnames';
import { NOT_FOUND_IMG } from '@constants/path';

interface ImageProps {
  src?: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
  overflow?: boolean;
}

const Image = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  overflow,
}: ImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src) src = NOT_FOUND_IMG;

  const _width = width ? width : 'w-full';
  const _height = height ? height : 'h-full';

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = NOT_FOUND_IMG;
    setError(true);
    setLoading(false);
  };

  return (
    <div
      className={classNames(_width, _height, {
        'overflow-hidden': overflow,
      })}
    >
      <img
        className={classNames('w-full h-full', className, {
          'animate-pulse bg-gray-200': loading,
          'bg-gray-50': error,
          'cursor-pointer': onClick,
        })}
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={() => setLoading(false)}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

export default Image;
