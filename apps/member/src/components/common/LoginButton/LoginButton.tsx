import { LOGIN_URL, SERVICE_NAME } from '@constants/environment';

import Image from '../Image/Image';

const LoginButton = () => {
  const handleLoginButtonClick = () => {
    window.location.href = LOGIN_URL;
  };

  return (
    <button
      onClick={handleLoginButtonClick}
      className="flex w-full max-w-xs items-center gap-4 rounded-md border border-black bg-[#292d32] px-4 py-2"
    >
      <Image src="/logo.webp" alt="C-Lab" width="w-8" height="h-8" />
      <span className="grow text-center font-semibold text-white">
        {SERVICE_NAME} Auth로 로그인
      </span>
    </button>
  );
};

export default LoginButton;
