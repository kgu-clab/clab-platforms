import { cn } from '@clab-platforms/utils';

interface TextSliderProps {
  keywords: Array<string>;
  direction: string;
}

export default function TextSlider({ keywords, direction }: TextSliderProps) {
  return (
    <div className="textLoopWrapper">
      <div
        className={cn(
          'textLoop',
          direction === 'left' ? 'textLoopLeft' : 'textLoopRight',
        )}
      >
        {keywords.map((keyword) => (
          <p
            key={keyword}
            className="text-clab-yellow-gray font-dung-geun-mo text-9xl font-bold"
          >
            {keyword}
          </p>
        ))}
      </div>
    </div>
  );
}
