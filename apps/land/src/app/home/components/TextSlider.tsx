import { cn } from '@clab-platforms/utils';

interface TextSliderProps {
  keywords: Array<string>;
  direction: string;
}

export default function TextSlider({ keywords, direction }: TextSliderProps) {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <div
        className={cn(
          'inline-flex',
          direction === 'left' ? 'textLoopLeft' : 'textLoopRight',
        )}
      >
        {keywords.map((keyword) => (
          <p
            key={keyword}
            className="text-clab-yellow-gray font-dung-geun-mo mr-16 text-[20vh] font-bold"
          >
            {keyword}
          </p>
        ))}
      </div>
    </div>
  );
}
