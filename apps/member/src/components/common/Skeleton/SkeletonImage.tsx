import { useState } from 'react';
import classNames from 'classnames';

interface SkeletonImageProps {
  src: string;
  alt: string;
  className: string;
  w?: number | string;
  h?: number | string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}
const SkeletonImage = ({
  src,
  alt,
  className,
  w = 'auto',
  h = 'auto',
  onClick,
}: SkeletonImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const width = w && `w-[${w}px]`;
  const height = h && `h-[${h}px]`;

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  if (error) {
    return (
      <img
        className={classNames('bg-gray-50', className, width, height, {
          'cursor-pointer': onClick,
        })}
        src="/not_found_preview.webp"
        alt={alt}
        onClick={onClick}
      />
    );
  }

  return (
    <img
      className={classNames(className, width, height, {
        'animate-pulse bg-gray-100': loading,
        'cursor-pointer': onClick,
      })}
      src={src}
      alt={alt}
      onClick={onClick}
      onLoad={() => setLoading(false)}
      onError={handleError}
    />
  );
};

export default SkeletonImage;
