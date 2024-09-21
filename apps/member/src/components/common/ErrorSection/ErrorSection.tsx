import { useNavigate } from 'react-router-dom';

import { Button } from '@clab-platforms/design-system';
import { HighPriorityColor } from '@clab-platforms/icon';

import Content from '../Content/Content';
import { Section } from '../Section';

interface Props {
  reset: () => void;
}

const ErrorSection = ({ reset }: Props) => {
  const navigate = useNavigate();

  return (
    <Content>
      <Section className="flex flex-col items-center justify-center gap-4 py-20">
        <HighPriorityColor width={64} height={64} />
        <div className="text-clab-main text-center font-semibold">
          <h1 className="text-2xl">해당 페이지에 접근할 수 없습니다.</h1>
        </div>
        <div className="break-keep text-center text-gray-500">
          <p>만약 같은 문제가 지속적으로 발생할 경우 문의 해주시기 바랍니다.</p>
          <p>감사합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
          <Button onClick={reset}>재시도</Button>
        </div>
      </Section>
    </Content>
  );
};

export default ErrorSection;
