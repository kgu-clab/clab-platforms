import classNames from 'classnames';
import { useState } from 'react';

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
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const _width = width ? width : 'w-full';
  const _height = height ? height : 'h-full';

  const handleError = () => {
    setImgSrc('/not_found.webp');
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
        src={imgSrc}
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
