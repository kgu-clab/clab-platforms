import { SyntheticEvent, useCallback, useState } from 'react';

import { cn, createURL } from '@clab-platforms/utils';

import { SERVER_BASE_URL } from '@constants/api';
import { NOT_FOUND_IMG } from '@constants/path';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  overflow?: boolean;
  isFile?: boolean;
}

type Status = 'loading' | 'error' | 'loaded';

const Image = ({
  width,
  height,
  src,
  overflow,
  className,
  onClick,
  isFile,
  ...rest
}: ImageProps) => {
  const [status, setStatus] = useState<Status>('loading');

  const _width = width ?? 'w-full';
  const _height = height ?? 'h-full';

  if (isFile) {
    if (!src?.startsWith(SERVER_BASE_URL)) {
      src = createURL(SERVER_BASE_URL, src);
    }
  }

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
            'animate-pulse bg-gray-200/50': status === 'loading',
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
