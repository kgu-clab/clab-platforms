import type { ApplicationType } from '@/types';

interface MessageProps {
  name: string;
}

interface ResultPassProps extends MessageProps {
  applicationType: ApplicationType;
}

const NormalMessage = ({ name }: MessageProps) => (
  <div>
    <b>{name}님</b>이 꿈꾸는 모든 것을 이룰 수 있도록 노력하고 지원하겠습니다.
    앞날을 기대하고 응원합니다.
  </div>
);

const CoreTeamMessage = ({ name }: MessageProps) => (
  <div>
    <p>
      역량이 뛰어난 분과 함께 Core Team을 활동을 할 수 있어 매우 영광입니다.
    </p>
    <br />
    <p>
      저희 팀은 <b>{name}님</b>의 모든 능력이 최대한 발휘될 수 있도록 적극
      지원하겠습니다. 앞으로의 활동을 적극적으로 참여해주시고, 잘 부탁드립니다.
      😄
    </p>
    <br />
    <p>
      <b>합격 발표일 내에 파트장이 연락</b>을 드릴 예정입니다.
    </p>
    <p>궁금한 점이 있으신 경우 언제든 편하게 문의 부탁드립니다.</p>
  </div>
);

const OperationMessage = ({ name }: MessageProps) => (
  <div>
    <b>{name}님</b>과 함께 다양한 아이디어와 변화를 꿈꾸며 더욱 발전할 C-Lab을
    기대하고 있습니다! 열정에 감사드리며, 즐겁고 의미있는 시간이 되기를
    바랍니다.
  </div>
);

export default function ResultPass({ name, applicationType }: ResultPassProps) {
  const messageComponent = {
    NORMAL: <NormalMessage name={name} />,
    CORE_TEAM: <CoreTeamMessage name={name} />,
    OPERATION: <OperationMessage name={name} />,
  }[applicationType];

  return (
    <div className="flex flex-col gap-4 break-keep">{messageComponent}</div>
  );
}
