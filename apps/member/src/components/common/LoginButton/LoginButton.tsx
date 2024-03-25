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
      className="max-w-xs flex items-center border border-black py-2 px-4 bg-[#292d32] gap-4 rounded-md w-full"
    >
      <Image src="/logo.webp" alt="C-Lab" width="w-8" height="h-8" />
      <span className="font-semibold text-center text-white grow">
        C-Lab Auth로 로그인
      </span>
    </button>
  );
};

export default LoginButton;
