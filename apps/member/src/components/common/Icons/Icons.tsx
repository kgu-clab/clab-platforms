import { icons } from '@assets/support/icons';
import classNames from 'classnames';

interface IconsProps {
  name: string;
  width: number | string;
  height: number | string;
  className?: string;
}

const Icons = ({ name, width, height, className }: IconsProps) => {
  const _width = typeof width === 'number' ? `w-${width}` : width;
  const _height = typeof height === 'number' ? `h-${height}` : height;

  return (
    <div className={classNames(_width, _height)}>
      <div
        className={classNames('w-full h-full', className)}
        dangerouslySetInnerHTML={{ __html: icons[name] }}
      ></div>
    </div>
  );
};

export default Icons;
