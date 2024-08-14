import { ComponentPropsWithRef } from 'react';

import { Button } from '@clab-platforms/design-system';

import useModal from '@hooks/common/useModal';
import { useSetIsLoggedInStore } from '@store/auth';
import { removeTokens } from '@utils/api';

interface LogoutButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'color' | 'size' | 'onClick'> {}

const LogoutButton = ({ children, ...rest }: LogoutButtonProps) => {
  const setIsLoggedIn = useSetIsLoggedInStore();
  const { openModal } = useModal();

  const onClickLogout = () => {
    openModal({
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
    <Button color="red" size="sm" onClick={onClickLogout} {...rest}>
      {children || '로그아웃'}
    </Button>
  );
};

export default LogoutButton;
