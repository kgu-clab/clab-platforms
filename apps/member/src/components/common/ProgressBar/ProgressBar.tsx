import classNames from 'classnames';

interface ProgressBarProps {
  className?: string;
  value: number;
}

const ProgressBar = ({ className, value }: ProgressBarProps) => {
  const valuePercent = value + '%';
  return (
    <div className="h-2 w-full bg-gray-200 rounded-full">
      <div
        style={{ width: valuePercent }}
        className={classNames('h-2 bg-black rounded-full', className)}
      ></div>
    </div>
  );
};

export default ProgressBar;
