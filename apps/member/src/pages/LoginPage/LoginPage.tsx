import Footer from '@components/common/Footer/Footer';
import LoginButton from '@components/common/LoginButton/LoginButton';
import { Button } from '@clab/design-system';

const LoginPage = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-dvh space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-bold text-3xl">로그인</h1>
          <p className="text-gray-500">동아리 회원만 이용할 수 있습니다.</p>
        </div>
        <LoginButton />
        <div className="flex gap-4 items-center w-full max-w-xs">
          <hr className="grow" />
          <span className="text-gray-500 text-sm">또는</span>
          <hr className="grow" />
        </div>
        <Button color="blue" className="max-w-xs py-2 px-4 w-full h-[50px]">
          합격 확인하기 🔖
        </Button>
        <div className="text-center text-sm">
          <p className="text-gray-500">C-Lab 회원이 아니신가요?</p>
          <button className="text-bold cursor-pointer underline after:content-['_↗']">
            동아리 지원하러 가기
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LoginPage;
