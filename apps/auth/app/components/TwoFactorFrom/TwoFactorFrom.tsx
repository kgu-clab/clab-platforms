import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useTwoFactorLoginMutation } from '@hooks/queries/useTwoFactorLoginMutation';
import QRCode from 'qrcode.react';

interface RegistrationProps {
  id: string;
  secretKey: string;
}

const TwoFactorFrom = ({ id, secretKey }: RegistrationProps) => {
  const { twoFactorLoginMutate } = useTwoFactorLoginMutation();

  const [enterCode, setEnterCode] = useState<string[]>([]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleEnterCode = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    setEnterCode((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    // 값이 입력되고, 현재 입력 필드가 마지막이 아니면 다음 입력 필드로 포커스 이동
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
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
      {secretKey && (
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
      )}
      <p className="mt-2 text-center font-semibold">인증코드를 입력해주세요.</p>
      <div className="mt-4 grid grid-cols-6 gap-2 font-semibold">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el!;
            }}
            name={index.toString()}
            type="text"
            inputMode="numeric"
            value={enterCode[index] || ''}
            maxLength={1}
            className="border-b-2 bg-transparent text-center transition-colors focus:border-sky-500 focus:outline-none"
            onChange={(e) => handleEnterCode(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TwoFactorFrom;
