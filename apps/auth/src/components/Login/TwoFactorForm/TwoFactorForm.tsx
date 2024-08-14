import { useEffect, useState } from 'react';

import { OTPInput } from '@clab-platforms/design-system';

import { type AuthData } from '@/app/[code]/page';
import { useTwoFactorLoginMutation } from '@/src/hooks/queries/useTwoFactorLoginMutation';
import QRCode from 'qrcode.react';

interface TwoFactorFormProps {
  data: AuthData;
  onSuccess: (data: AuthData) => void;
  onFail: () => void;
}

const TwoFactorForm = ({ data, onSuccess, onFail }: TwoFactorFormProps) => {
  const [otpInput, setOTPInput] = useState<string[]>(['', '', '', '', '', '']);
  const { twoFactorLoginMutate } = useTwoFactorLoginMutation();

  useEffect(() => {
    const otpCode = otpInput.join('');

    if (otpCode.length === 6) {
      twoFactorLoginMutate(
        {
          memberId: data.id!,
          totp: otpCode,
          code: data.code,
        },
        {
          onSuccess: ({ success, token }) => {
            if (success) {
              onSuccess({ ...data, token });
            } else {
              onFail();
            }
          },
          onError: () => onFail(),
        },
      );
    }
  }, [
    data,
    data.code,
    data.id,
    onFail,
    onSuccess,
    otpInput,
    twoFactorLoginMutate,
  ]);

  return (
    <div className="flex flex-col items-center gap-2">
      {data.id && data.secretKey && (
        <div className="my-2 flex flex-col items-center gap-2">
          <p className="text-center font-semibold">
            클라이언트에 <u>아래의 QR코드</u>를 등록해주세요.
          </p>
          <QRCode
            className="rounded-lg border-4 p-2"
            value={`otpauth://totp/c-lab:${data.id}?secret=${data.secretKey}&issuer=C-Lab Auth`}
            size={200}
          />
        </div>
      )}
      <p className="text-center font-semibold">인증코드를 입력해주세요.</p>
      <OTPInput value={otpInput} onChange={setOTPInput} />
    </div>
  );
};

export default TwoFactorForm;
