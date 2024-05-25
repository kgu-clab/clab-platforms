import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input } from '@clab/design-system';

import { type AuthData } from '@/app/[code]/page';
import { useLoginMutation } from '@/src/hooks/queries/useLoginMutation';
import { type PostLoginData } from '@api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface LoginFormProps {
  data: AuthData;
  onLogin: (data: AuthData) => void;
  onTwoFactor: (data: AuthData) => void;
}

const schema = z.object({
  id: z.string().length(9, { message: '아이디 입력이 올바르지 않아요.' }),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

const LoginForm = ({ data, onLogin, onTwoFactor }: LoginFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostLoginData>({
    resolver: zodResolver(schema),
  });
  const { loginMutate, isPending } = useLoginMutation();

  const handleFormSubmit: SubmitHandler<PostLoginData> = ({ id, password }) => {
    loginMutate(
      { id, password, code: data.code },
      {
        onSuccess: ({ data: isUseTwoFactor, secretKey }) => {
          if (isUseTwoFactor) {
            onTwoFactor({ code: data.code, id, secretKey });
          } else {
            onLogin({ code: data.code, id, secretKey });
          }
        },
        onError: () => reset(),
      },
    );
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
