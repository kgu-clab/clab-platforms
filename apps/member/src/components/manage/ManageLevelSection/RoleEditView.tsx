import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Badge,
  BadgeColorVariant,
  Input,
  Table,
} from '@clab-platforms/design-system';
import { SearchOutline, SettingsColor } from '@clab-platforms/icon';

import Pagination from '@components/common/Pagination/Pagination.tsx';

import { TABLE_HEAD, TABLE_HEAD_ACTION } from '@constants/head.ts';
import { usePagination } from '@hooks/common/usePagination.ts';
import { useMemberRole } from '@hooks/queries/member';
import { useMemberSettingModal } from '@pages/ManagePage/hooks/useMemberSettingModal.tsx';
import { isNumeric } from '@utils/member.ts';
import { toKoreaMemberLevel } from '@utils/string.ts';

import { Role } from '@type/manage.ts';
import type { RoleLevelKey } from '@type/member.ts';

interface RoleEditViewProps {
  role: Role;
}

const roleColors: Record<RoleLevelKey, BadgeColorVariant> = {
  SUPER: 'red',
  ADMIN: 'blue',
  USER: 'green',
};

const RoleEditView = ({ role }: RoleEditViewProps) => {
  const navigation = useNavigate();
  const { page, size, handlePageChange } = usePagination({
    defaultSize: 6,
    sectionName: 'level',
  });
  const [searchWords, setSearchWords] = useState<string>('');

  const { data, refetch } = useMemberRole({
    page: page,
    size: size,
    memberId: searchWords && isNumeric(searchWords) ? searchWords : undefined,
    memberName:
      searchWords && !isNumeric(searchWords) ? searchWords : undefined,
    role: role || undefined,
  });

  const { open } = useMemberSettingModal();

  const handleSearchClick = () => {
    refetch();
  };

  useEffect(() => {
    navigation('/manage');
    setSearchWords('');
  }, [role, navigation]);

  return (
    <>
      <div className="mb-4 flex gap-2">
        <Input
          className="w-full"
          id="searchWords"
          name="searchWords"
          value={searchWords}
          placeholder="학번이나 이름을 입력해주세요"
          onChange={(e) => setSearchWords(e.target.value)}
        />
        <SearchOutline
          width={24}
          height={24}
          className="m-auto hover:cursor-pointer"
          onClick={() => handleSearchClick()}
        />
      </div>
      <Table head={[...TABLE_HEAD.MEMBER_MANAGE_TABLE, TABLE_HEAD_ACTION]}>
        {data.items.map(({ id, name, role }, index) => (
          <Table.Row key={id}>
            <Table.Cell>{index + 1 + page * size}</Table.Cell>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>
              <Badge color={roleColors[role]}>{toKoreaMemberLevel(role)}</Badge>
            </Table.Cell>
            <Table.Cell>
              <button
                type="button"
                onClick={() => open({ memberId: id, name, role })}
              >
                <SettingsColor
                  width={16}
                  height={16}
                  className="transition-all hover:brightness-150"
                />
              </button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
      <Pagination
        className="mt-4 justify-center"
        page={page}
        postLimit={size}
        totalItems={data.totalItems}
        onChange={handlePageChange}
      />
    </>
  );
};

export default RoleEditView;
