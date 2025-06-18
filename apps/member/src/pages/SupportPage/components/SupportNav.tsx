import { useNavigate } from 'react-router';

import { Button } from '@clab-platforms/design-system';

import { PATH } from '@constants/path';

const SupportNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        size="sm"
        color="red"
        onClick={() => navigate(PATH.SUPPORT_WRITE)}
      >
        문의하기
      </Button>
      <Button size="sm" onClick={() => navigate(PATH.SUPPORT_LIST)}>
        내 문의 확인하기
      </Button>
    </>
  );
};

export default SupportNav;
