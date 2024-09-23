import { useMemo } from 'react';

import { useModal } from '@hooks/common/useModal';
import { useMemberPasswordResend } from '@pages/ManagePage/hooks/useMemberPasswordResendMutation';

interface Options {
  memberId: string;
  name: string;
}

/**
 * 비밀번호 재전송 모달을 엽니다.
 */
export function useMemberPasswordResendModal() {
  const { open } = useModal();
  const { memberPasswordResendMutate } = useMemberPasswordResend();

  const handlePasswordResendButtonClick = (memberId: string) => {
    memberPasswordResendMutate(memberId);
  };

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: '비밀번호 재전송',
          content: <MemberPasswordResendModal {...options} />,
          accept: {
            text: '재전송',
            onClick: () => handlePasswordResendButtonClick(options.memberId),
          },
        }),
    }),
    [open],
  );
}

interface Props extends Options {}

function MemberPasswordResendModal({ memberId, name }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="p-1.5 text-left text-sm">
          <span className="font-bold text-red-400">
            {memberId + '/' + name + ' '}
          </span>
          사용자의 비밀번호를 등록된 이메일로 재전송합니다.
        </p>
      </div>
    </div>
  );
}
