'use client';

import { ChangeEvent, useState } from 'react';
import { Button, Input } from '@clab/design-system';
import { useLoginMutation } from '@hooks/queries/useLoginMutation';
import { AUTH_ATOM_STATE, useAuthStore } from '@store/auth';
import TwoFactorFrom from '../TwoFactorFrom/TwoFactorFrom';
import { useCode } from '@hooks/useCode';

const LoginFrom = () => {
  const auth = useAuthStore();
  const { code } = useCode();

  const [input, setInput] = useState({
    id: '',
    password: '',
  });

  const { loginMutate } = useLoginMutation();

  if (!code) {
    return null;
  }

  if (auth[0].step !== AUTH_ATOM_STATE.LOGIN) {
    const { id, secretKey } = auth[0];
    return <TwoFactorFrom id={id} secretKey={secretKey} />;
  }

  const { id, password } = input;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id.length !== 9 || !password) return;

    loginMutate({ id, password });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-xs flex-col justify-center gap-4"
    >
      <Input
        id="id"
        name="id"
        inputMode="numeric"
        type="text"
        label="아이디"
        placeholder="아이디(학번)을 입력해주세요."
        value={id}
        onChange={onChange}
      />
      <Input
        id="password"
        type="password"
        name="password"
        label="비밀번호"
        placeholder="비빌번호를 입력해주세요."
        value={password}
        onChange={onChange}
      />
      <Button type="submit" className="mt-2">
        로그인 🚀
      </Button>
    </form>
  );
};

export default LoginFrom;
