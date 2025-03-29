import { useCallback, useMemo } from 'react';

import { useModal } from '@hooks/common/useModal';

import { useMemberDelete } from './useMemberDelete';

interface Options {
  memberId: string;
  name: string;
}

/**
 * 비밀번호 재전송 모달을 엽니다.
 */
export function useMemberDeleteModal() {
  const { open } = useModal();
  const { memberDeleteMutate } = useMemberDelete();

  const handleMemberDeleteButtonClick = useCallback(
    (memberId: string) => {
      memberDeleteMutate(memberId);
    },
    [memberDeleteMutate],
  );

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: '계정 삭제',
          content: <MemberDeleteModal {...options} />,
          accept: {
            text: '삭제',
            onClick: () => handleMemberDeleteButtonClick(options.memberId),
          },
        }),
    }),
    [open, handleMemberDeleteButtonClick],
  );
}

interface Props extends Options {}

function MemberDeleteModal({ memberId, name }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="p-1.5 text-left text-sm">
          <span className="font-bold text-red-400">
            {memberId + ' ' + name}
          </span>
          의 계정을 삭제합니다.
        </p>
      </div>
    </div>
  );
}
