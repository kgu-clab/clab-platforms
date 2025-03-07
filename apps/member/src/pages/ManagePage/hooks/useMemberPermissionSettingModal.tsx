import { useMemo, useState } from 'react';

import { Button } from '@clab-platforms/design-system';

import Select from '@components/common/Select/Select';

import { ROLE_LEVEL } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import { useToast } from '@hooks/common/useToast';
import { useMemberRoleMutation } from '@hooks/queries/member';
import { toKoreaMemberLevel } from '@utils/string';

import { Role } from '@type/manage';
import type { RoleLevelKey } from '@type/member';

interface Options {
  memberId: string;
  role: Role;
}

const roleOptions = Object.keys(ROLE_LEVEL).map((key) => ({
  name: toKoreaMemberLevel(key as RoleLevelKey),
  value: key as RoleLevelKey,
}));

/**
 * 멤버 설정 모달을 엽니다.
 */
export function useMemberPermissionSettingModal() {
  const { open } = useModal();

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: '권한 변경',
          content: <MemberPermissionSettingModal {...options} />,
        }),
    }),
    [open],
  );
}

interface Props extends Options {}

function MemberPermissionSettingModal({ memberId, role }: Props) {
  const [changeRole, setChangeRole] = useState(role);
  const { addToast } = useToast();
  const { memberRoleMutation } = useMemberRoleMutation();

  const handleLevelChangeButtonClick = () => {
    if (!changeRole) {
      return addToast({
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

  return (
    <div className="space-y-4">
      <div className="relative">
        <Select
          label="멤버 권한 설정"
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
    </div>
  );
}
