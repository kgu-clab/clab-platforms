'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useTwoFactorLoginMutation } from '@hooks/queries/useTwoFactorLoginMutation';
import QRCode from 'qrcode.react';

interface RegistrationProps {
  id: string;
  secretKey: string;
}

const Registration = ({ id, secretKey }: RegistrationProps) => (
  <>
    <p className="text-center font-semibold">
      클라이언트에 아래의 QR코드를 등록해주세요.
    </p>
    <QRCode
      className="my-8 rounded-lg border-4 p-2"
      value={`otpauth://totp/c-lab:${id}?secret=${secretKey}&issuer=C-Lab Auth`}
      size={200}
    />
  </>
);

const TwoFactorFrom = ({ id, secretKey }: RegistrationProps) => {
  const { twoFactorLoginMutate } = useTwoFactorLoginMutation();

  const [enterCode, setEnterCode] = useState<string[]>([]);

  const handleEnterCode = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEnterCode((prev) => {
      const updated = [...prev];
      updated[Number(name)] = value;
      return updated;
    });
  };

  useEffect(() => {
    const authenticationCode = enterCode.join('');

    if (authenticationCode.length === 6) {
      twoFactorLoginMutate({
        memberId: id,
        totp: authenticationCode,
      });
    }
  }, [enterCode, id, twoFactorLoginMutate]);

  return (
    <div className="flex flex-col items-center">
      {secretKey && <Registration id={id} secretKey={secretKey} />}
      <p className="mt-2 text-center font-semibold">인증코드를 입력해주세요.</p>
      <div className="mt-4 grid grid-cols-6 gap-2 font-semibold">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            name={index.toString()}
            type="text"
            inputMode="numeric"
            value={enterCode[index] || ''}
            maxLength={1}
            className="border-b-2 bg-transparent text-center transition-colors focus:border-sky-500 focus:outline-none"
            onChange={handleEnterCode}
          />
        ))}
      </div>
    </div>
  );
};

export default TwoFactorFrom;
