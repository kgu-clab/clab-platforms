import LoginStep from '@components/Login/LoginStep/LoginStep';

import { type ServiceCode } from '@utils/service';

import type { Token } from '@type/server';

type LoginStep = 'login' | 'two-factor' | 'success';

export interface AuthData {
  code: ServiceCode;
  id: string | null;
  secretKey?: string | null;
  token?: Token;
}

export default async function LoginPage({
  params,
}: Readonly<{ params: Promise<{ code: ServiceCode }> }>) {
  const { code } = await params;

  return <LoginStep code={code} />;
}
