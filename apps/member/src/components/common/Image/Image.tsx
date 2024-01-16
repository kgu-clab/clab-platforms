import classNames from 'classnames';
import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  className?: string;
  onClick?: () => void;
}

const Image = ({ src, alt, width, height, className, onClick }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setImgSrc('/not_found.webp');
    setError(true);
    setLoading(false);
  };

  const _width = typeof width === 'number' ? `w-${width}` : width;
  const _height = typeof height === 'number' ? `h-${height}` : height;

  return (
    <div className={classNames(_width, _height)}>
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
      />
    </div>
  );
};

export default Image;
