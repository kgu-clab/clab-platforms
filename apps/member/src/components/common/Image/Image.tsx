import { SyntheticEvent, useCallback, useState } from 'react';

import { NOT_FOUND_IMG } from '@constants/path';
import { cn } from '@utils/string';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  overflow?: boolean;
}

type Status = 'loading' | 'error' | 'loaded';

const Image = ({
  width,
  height,
  src,
  overflow,
  className,
  onClick,
  ...rest
}: ImageProps) => {
  const [status, setStatus] = useState<Status>('loading');

  const _width = width ?? 'w-full';
  const _height = height ?? 'h-full';

  const handleLoad = useCallback(() => {
    setStatus('loaded');
  }, []);

  const handleError = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = NOT_FOUND_IMG;
    setStatus('error');
  }, []);

  return (
    <div
      className={cn(_width, _height, {
        'overflow-hidden': overflow,
      })}
      onClick={onClick}
    >
      <img
        className={cn(
          {
            'animate-pulse bg-gray-200': status === 'loading',
            'bg-gray-50': status === 'error',
          },
          _width,
          _height,
          className,
        )}
        src={src ?? NOT_FOUND_IMG}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...rest}
      />
    </div>
  );
};

export default Image;
