'use client';

import { useState } from 'react';

import LoginForm from '@components/Login/LoginForm/LoginForm';
import LoginSuccess from '@components/Login/LoginSuccess/LoginSuccess';
import TwoFactorForm from '@components/Login/TwoFactorForm/TwoFactorForm';

import { useFunnel } from '@hooks/useFunnel';
import { type ServiceCode } from '@utils/service';

import type { Token } from '@type/server';

type LoginStep = 'login' | 'two-factor' | 'success';

export interface AuthData {
  code: ServiceCode;
  id: string | null;
  secretKey?: string | null;
  token?: Token;
}

export default function LoginPage({
  params,
}: Readonly<{ params: { code: ServiceCode } }>) {
  const { Funnel, setStep } = useFunnel<LoginStep>('login');
  const [authData, setAuthData] = useState<AuthData>({
    code: params.code,
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
