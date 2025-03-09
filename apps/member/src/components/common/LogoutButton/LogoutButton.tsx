import { type ComponentPropsWithoutRef } from 'react';

import { Button } from '@clab-platforms/design-system';

import { useIsLoggedIn } from '@hooks/common/useIsLoggedIn';
import { useModal } from '@hooks/common/useModal';
import { removeTokens } from '@utils/api';

interface Props
  extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'color' | 'size' | 'onClick'
  > {}

const LogoutButton = ({ children, ...props }: Props) => {
  const { updateLogged } = useIsLoggedIn();
  const { open } = useModal();

  const handleLogoutClick = () => {
    open({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      accept: {
        text: '로그아웃',
        onClick: () => {
          removeTokens();
          updateLogged(false);
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
