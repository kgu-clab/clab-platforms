import { useEffect, useState } from 'react';

import { OTPInput } from '@clab/design-system';

import { useTwoFactorLoginMutation } from '@/src/hooks/queries/useTwoFactorLoginMutation';
import { type ServiceCode } from '@utils/service';
import QRCode from 'qrcode.react';

interface TwoFactorFormProps {
  id: string;
  secretKey: string;
  code: ServiceCode;
}

const TwoFactorFormProps = ({ id, secretKey, code }: TwoFactorFormProps) => {
  const [otpInput, setOTPInput] = useState<string[]>([]);
  const { twoFactorLoginMutate } = useTwoFactorLoginMutation();

  useEffect(() => {
    const otpCode = otpInput.join('');

    if (otpCode.length === 6) {
      twoFactorLoginMutate({
        memberId: id,
        totp: otpCode,
        code: code,
      });
    }
  }, [code, id, otpInput, twoFactorLoginMutate]);

  return (
    <div className="flex flex-col items-center gap-2">
      {id && secretKey && (
        <div className="my-2 flex flex-col items-center gap-2">
          <p className="text-center font-semibold">
            클라이언트에 <u>아래의 QR코드</u>를 등록해주세요.
          </p>
          <QRCode
            className="rounded-lg border-4 p-2"
            value={`otpauth://totp/c-lab:${id}?secret=${secretKey}&issuer=C-Lab Auth`}
            size={200}
          />
        </div>
      )}
      <p className="text-center font-semibold">인증코드를 입력해주세요.</p>
      <OTPInput value={otpInput} onChange={setOTPInput} />
    </div>
  );
};

export default TwoFactorFormProps;
