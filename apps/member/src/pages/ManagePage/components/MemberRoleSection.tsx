import { useState } from 'react';

import { Menubar, Spinner } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';
import AddMemberForm from '@components/manage/ManageLevelSection/AddMemberForm.tsx';
import RoleEditView from '@components/manage/ManageLevelSection/RoleEditView.tsx';

import { useView } from '@hooks/common/useView';
import { Suspense } from '@suspensive/react';

import { Role } from '@type/manage.ts';

type View = 'view' | 'add';

export function MemberRoleSection() {
  const [role, setRole] = useState<Role>('');
  const { view, setView, handleViewClick } = useView<View>('view');

  const handleMenubarItemClick = (role: Role) => {
    setRole(role);
    setView('view');
  };

  const renderView = {
    view: <RoleEditView role={role} />,
    add: <AddMemberForm />,
  }[view];

  return (
    <Section>
      <Section.Header
        title="멤버 관리"
        description="멤버 목록과 권한을 관리할 수 있어요"
      >
        <Menubar className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
          <Menubar.Item
            className="min-w-[40px] whitespace-nowrap sm:min-w-0"
            selected={role === '' && view === 'view'}
            onClick={() => handleMenubarItemClick('')}
          >
            전체
          </Menubar.Item>
          <Menubar.Item
            className="min-w-[30px] whitespace-nowrap sm:min-w-0"
            selected={role === 'SUPER' && view === 'view'}
            onClick={() => handleMenubarItemClick('SUPER')}
          >
            관리자
          </Menubar.Item>
          <Menubar.Item
            className="min-w-[30px] whitespace-nowrap sm:min-w-0"
            selected={role === 'ADMIN' && view === 'view'}
            onClick={() => handleMenubarItemClick('ADMIN')}
          >
            운영진
          </Menubar.Item>
          <Menubar.Item
            className="min-w-[30px] whitespace-nowrap sm:min-w-0"
            selected={role === 'USER' && view === 'view'}
            onClick={() => handleMenubarItemClick('USER')}
          >
            일반
          </Menubar.Item>
          <Menubar.Item
            className="min-w-[30px] whitespace-nowrap sm:min-w-0"
            selected={view === 'add'}
            onClick={() => handleViewClick('add')}
          >
            추가
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body>
        <Suspense
          fallback={
            <div className="pb-52 pt-40 text-center">
              <Spinner />
            </div>
          }
        >
          <div className="w-full overflow-x-auto">
            <div className="min-w-[700px]">{renderView}</div>
          </div>
        </Suspense>
      </Section.Body>
    </Section>
  );
}
