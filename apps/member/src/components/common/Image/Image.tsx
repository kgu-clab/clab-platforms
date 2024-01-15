import classNames from 'classnames';
import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  w?: number;
  h?: number;
  onClick?: () => void;
}

const Image = ({ src, alt, className, w, h, onClick }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const width = w ? `w-[${w}px]` : 'w-full';
  const height = h ? `h-[${h}px]` : 'h-full';

  const handleError = () => {
    setImgSrc('/not_found.webp');
    setError(true);
    setLoading(false);
  };

  return (
    <img
      className={classNames(className, width, height, {
        'animate-pulse bg-gray-200': loading,
        'bg-gray-50': error,
        'cursor-pointer': onClick
      })}
      src={imgSrc}
      alt={alt}
      onClick={onClick}
      onLoad={() => setLoading(false)}
      onError={handleError}
    />
  );
};

export default Image;
