'use client';

import { useState } from 'react';

import { useFunnel } from '@hooks/useFunnel';
import { ServiceCode } from '@utils/service';

import { Token } from '@type/server';

import LoginForm from '../LoginForm/LoginForm';
import LoginSuccess from '../LoginSuccess/LoginSuccess';
import TwoFactorForm from '../TwoFactorForm/TwoFactorForm';

type LoginStep = 'login' | 'two-factor' | 'success';

interface Props {
  code: ServiceCode;
}

interface AuthData {
  code: ServiceCode;
  id: string | null;
  secretKey?: string | null;
  token?: Token;
}

export default function LoginStep({ code }: Props) {
  const { Funnel, setStep } = useFunnel<LoginStep>('login');
  const [authData, setAuthData] = useState<AuthData>({
    code: code,
    id: null,
  });

  return (
    <Funnel>
      <Funnel.Step name="login">
        <LoginForm
          data={authData}
          onLogin={(data) => {
            // 2차 인증 미사용자, 로그인 성공
            setAuthData(data);
            setStep('success');
          }}
          onTwoFactor={(data) => {
            // 2차 인증 사용자
            setAuthData(data);
            setStep('two-factor');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="two-factor">
        <TwoFactorForm
          data={authData}
          onSuccess={(data) => {
            // 2차 인증 사용자, 로그인 성공
            setAuthData(data);
            setStep('success');
          }}
          onFail={() => {
            // 로그인 실패, 첫 번째 단계로 이동
            setStep('login');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="success">
        <LoginSuccess data={authData} />
      </Funnel.Step>
    </Funnel>
  );
}
