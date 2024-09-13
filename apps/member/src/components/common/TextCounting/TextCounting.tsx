import { cn } from '@clab-platforms/utils';

interface MaxLengthCounterProps {
  maxLength: number;
  text?: string;
  children?: string;
}

const TextCounting = ({ maxLength, text, children }: MaxLengthCounterProps) => {
  return (
    <p
      className={cn('mt-2 text-right text-xs', children, {
        'text-red-500': text && text.length > maxLength,
      })}
    >
      <span>{text ? text.length : '0'}</span>
      <span>{'/' + maxLength + '자'}</span>
    </p>
  );
};

export default TextCounting;
