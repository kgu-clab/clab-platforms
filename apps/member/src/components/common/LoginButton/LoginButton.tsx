import { MODE } from '@constants/environment';

import Image from '../Image/Image';

const LoginButton = () => {
  const handleClick = () => {
    const code = MODE === 'production' ? 'play' : 'dev';
    window.location.href = `https://auth.clab.page/?code=${code}`;
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full max-w-xs items-center gap-4 rounded-md border border-black bg-[#292d32] px-4 py-2"
    >
      <Image src="/logo.webp" alt="C-Lab" width="w-8" height="h-8" />
      <span className="grow text-center font-semibold text-white">
        C-Lab Auth로 로그인
      </span>
    </button>
  );
};

export default LoginButton;
