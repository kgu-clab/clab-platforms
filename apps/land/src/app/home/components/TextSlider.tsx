import { cn } from '@clab-platforms/utils';

interface TextSliderProps {
  keywords: Array<string>;
  direction: string;
}

export const TextSlider = ({ keywords, direction }: TextSliderProps) => {
  return (
    <div className="textLoopWrapper">
      <div
        className={cn(
          'textLoop',
          direction === 'left' ? 'textLoopLeft' : 'textLoopRight',
        )}
      >
        {keywords.map((keyword) => (
          <h1
            key={keyword}
            className="text-clab-yellow-gray font-dung-geun-mo text-9xl font-bold"
          >
            {keyword}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;
