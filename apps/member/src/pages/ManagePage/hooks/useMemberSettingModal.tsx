import { useMemo, useState } from 'react';

import { Button } from '@clab-platforms/design-system';

import Select from '@components/common/Select/Select.tsx';

import { ROLE_LEVEL } from '@constants/state.ts';
import { useModal } from '@hooks/common/useModal.ts';
import useToast from '@hooks/common/useToast.ts';
import { useMemberRoleMutation } from '@hooks/queries/member';
import { useMemberPasswordResend } from '@pages/ManagePage/hooks/useMemberPasswordResendMutation.ts';
import { toKoreaMemberLevel } from '@utils/string.ts';

import { Role } from '@type/manage.ts';
import type { RoleLevelKey } from '@type/member.ts';

interface Options {
  memberId: string;
  name: string;
  role: Role;
}

const roleOptions = Object.keys(ROLE_LEVEL).map((key) => ({
  name: toKoreaMemberLevel(key as RoleLevelKey),
  value: key as RoleLevelKey,
}));

/**
 * 멤버 설정 모달을 엽니다.
 */
export function useMemberSettingModal() {
  const { open } = useModal();

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: '멤버 설정',
          content: <MemberSettingModal {...options} />,
        }),
    }),
    [open],
  );
}

interface Props extends Options {}

function MemberSettingModal({ memberId, name, role }: Props) {
  const [changeRole, setChangeRole] = useState(role);
  const toast = useToast();
  const { memberRoleMutation } = useMemberRoleMutation();
  const { memberPasswordResendMutate } = useMemberPasswordResend();

  const handleLevelChangeButtonClick = () => {
    if (!changeRole) {
      return toast({
        state: 'error',
        message: '권한을 선택해주세요',
      });
    } else {
      memberRoleMutation({
        memberId,
        body: { role: changeRole },
      });
    }
  };

  const handlePasswordResendButtonClick = () => {
    memberPasswordResendMutate(memberId);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Select
          label="권한 설정"
          options={roleOptions}
          value={changeRole}
          name="studentStatus"
          onChange={(e) => setChangeRole(e.target.value as RoleLevelKey)}
        />
        <Button
          size="sm"
          color="red"
          className="absolute bottom-1 right-1"
          onClick={handleLevelChangeButtonClick}
        >
          변경하기
        </Button>
      </div>
      <div className="flex flex-col">
        <label className="ml-1 text-left text-xs">비밀번호 재전송</label>
        <div className="flex justify-between">
          <p className="p-1.5 text-left text-sm">
            <span className="font-bold text-red-400">
              {memberId + '/' + name + ' '}
            </span>
            사용자의 비밀번호를 등록된 이메일로 재전송합니다.
          </p>
          <Button
            size="sm"
            color="red"
            onClick={handlePasswordResendButtonClick}
          >
            초기화
          </Button>
        </div>
      </div>
    </div>
  );
}
