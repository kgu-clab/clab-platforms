import { useState } from 'react';

import { Menubar, Spinner } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';
import AddMemberForm from '@components/manage/ManageLevelSection/AddMemberForm.tsx';
import RoleEditView from '@components/manage/ManageLevelSection/RoleEditView.tsx';

import { Suspense } from '@suspensive/react';

import { Mode, Role } from '@type/manage.ts';

const ManageLevelSection = () => {
  const [role, setRole] = useState<Role>('');
  const [mode, setMode] = useState<Mode>('view');

  const handleMenubarItemClick = (role: Role) => {
    setRole(role);
    setMode('view');
  };

  const renderView = {
    view: <RoleEditView role={role} />,
    add: <AddMemberForm />,
  }[mode];

  return (
    <Section>
      <Section.Header
        title="멤버 관리"
        description="멤버 목록과 권한을 관리할 수 있어요"
      >
        <Menubar>
          <Menubar.Item
            selected={role === '' && mode === 'view'}
            onClick={() => handleMenubarItemClick('')}
          >
            전체
          </Menubar.Item>
          <Menubar.Item
            selected={role === 'SUPER' && mode === 'view'}
            onClick={() => handleMenubarItemClick('SUPER')}
          >
            관리자
          </Menubar.Item>
          <Menubar.Item
            selected={role === 'ADMIN' && mode === 'view'}
            onClick={() => handleMenubarItemClick('ADMIN')}
          >
            운영진
          </Menubar.Item>
          <Menubar.Item
            selected={role === 'USER' && mode === 'view'}
            onClick={() => handleMenubarItemClick('USER')}
          >
            일반
          </Menubar.Item>
          <Menubar.Item
            selected={mode === 'add'}
            onClick={() => setMode('add')}
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
          {renderView}
        </Suspense>
      </Section.Body>
    </Section>
  );
};

export default ManageLevelSection;
