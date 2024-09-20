import { Button } from '@clab-platforms/design-system';
import { HighPriorityColor } from '@clab-platforms/icon';

interface Props {
  reset: () => void;
}

const ErrorSection = ({ reset }: Props) => {
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-4">
      <HighPriorityColor width={64} height={64} />
      <div className="text-clab-main text-center font-semibold">
        <h1 className="text-2xl">
          불편을 드려 죄송합니다. 오류가 발생했어요. 😭
        </h1>
      </div>
      <div className="break-keep text-center text-gray-500">
        <p>만약 같은 문제가 지속적으로 발생할 경우 문의 해주시기 바랍니다.</p>
        <p>감사합니다.</p>
      </div>
      <Button onClick={reset}>재시도</Button>
    </div>
  );
};

export default ErrorSection;
