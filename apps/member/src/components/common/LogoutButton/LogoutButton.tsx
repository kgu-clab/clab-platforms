import { type ComponentPropsWithoutRef } from 'react';

import { Button } from '@clab-platforms/design-system';

import { useModal } from '@hooks/common/useModal';
import { useSetIsLoggedInStore } from '@store/auth';
import { removeTokens } from '@utils/api';

interface Props
  extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'color' | 'size' | 'onClick'
  > {}

const LogoutButton = ({ children, ...props }: Props) => {
  const setIsLoggedIn = useSetIsLoggedInStore();
  const { open } = useModal();

  const handleLogoutClick = () => {
    open({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      accept: {
        text: '로그아웃',
        onClick: () => {
          removeTokens();
          setIsLoggedIn(false);
        },
      },
    });
  };

  return (
    <Button color="red" size="sm" onClick={handleLogoutClick} {...props}>
      {children || '로그아웃'}
    </Button>
  );
};

export default LogoutButton;
