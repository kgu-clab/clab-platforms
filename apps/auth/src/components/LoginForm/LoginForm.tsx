'use client';

import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input } from '@clab/design-system';

import { useLoginMutation } from '@/src/hooks/queries/useLoginMutation';
import { AUTH_ATOM_STATE, useGetAuthStore } from '@/src/store/auth';
import { type PostLoginData } from '@api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useService } from '@hooks/useService';
import { z } from 'zod';

import TwoFactorForm from '../TwoFactorForm/TwoFactorForm';

const schema = z.object({
  id: z.string().length(9, { message: '아이디 입력이 올바르지 않아요.' }),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

const LoginForm = () => {
  const service = useService();
  const auth = useGetAuthStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostLoginData>({
    resolver: zodResolver(schema),
  });
  const { loginMutate, isPending } = useLoginMutation();

  useEffect(() => {
    reset();
  }, [auth.step, reset]);

  if (!service) {
    return null;
  }

  if (auth.step !== AUTH_ATOM_STATE.LOGIN) {
    // 2차 인증이 필요한 인원은 2차 인증 페이지로 이동
    const { id, secretKey } = auth;
    return <TwoFactorForm id={id} secretKey={secretKey} code={service.code} />;
  }

  const handleFormSubmit: SubmitHandler<PostLoginData> = ({ id, password }) => {
    loginMutate({ id, password, code: service.code });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full max-w-xs flex-col justify-center gap-4"
    >
      <Input
        {...register('id')}
        type="text"
        label="아이디"
        placeholder="아이디(학번)을 입력해주세요."
        aria-invalid={errors.id ? 'true' : 'false'}
        message={errors.id?.message}
        inputClassName={errors.id && ' border-red-500'}
        messageClassName="text-red-500"
      />
      <Input
        {...register('password')}
        type="password"
        label="비밀번호"
        placeholder="비빌번호를 입력해주세요."
        aria-invalid={errors.password ? 'true' : 'false'}
        message={errors.password?.message}
        inputClassName={errors.password && ' border-red-500'}
        messageClassName="text-red-500"
      />
      <Button
        type="submit"
        loading={isPending}
        color={(errors.id || errors.password) && 'red'}
        className="mt-2"
      >
        로그인 🚀
      </Button>
    </form>
  );
};

export default LoginForm;
