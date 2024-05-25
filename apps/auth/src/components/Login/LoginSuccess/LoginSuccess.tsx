import React, { useEffect } from 'react';

import { type AuthData } from '@/app/[code]/page';
import { REDIRECT_WITH_TOKEN } from '@utils/service';

interface LoginSuccessProps {
  data: AuthData;
}

const LoginSuccess = ({ data }: LoginSuccessProps) => {
  useEffect(() => {
    // 로그인 성공 후 연결된 서비스로 이동
    window.location.href = REDIRECT_WITH_TOKEN(data.code, data.token!);
  }, [data.code, data.token]);

  return (
    <div>
      <p className="text-center font-semibold">환영합니다!</p>
      <p>잠시 후 연결된 서비스로 이동됩니다...</p>
    </div>
  );
};

export default LoginSuccess;
