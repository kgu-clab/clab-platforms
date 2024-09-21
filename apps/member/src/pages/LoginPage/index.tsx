import { Button } from '@clab-platforms/design-system';

import Footer from '@components/common/Footer/Footer';
import Linker from '@components/common/Linker/Linker';
import LoginButton from '@components/common/LoginButton/LoginButton';

import { IS_PRODUCTION } from '@constants/environment';

export default function LoginPage() {
  return (
    <main>
      <div className="flex min-h-dvh flex-col items-center justify-center space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">로그인</h1>
          <p className="text-gray-500">동아리 회원만 이용할 수 있습니다.</p>
        </div>
        <LoginButton />
        {IS_PRODUCTION && (
          <>
            <div className="flex w-full max-w-xs items-center gap-4">
              <hr className="grow" />
              <span className="text-sm text-gray-500">또는</span>
              <hr className="grow" />
            </div>
            <Button color="blue" className="h-[50px] w-full max-w-xs px-4 py-2">
              합격 확인하기 🔖
            </Button>
          </>
        )}
        <div className="text-center text-sm">
          <p className="text-gray-500">C-Lab 회원이 아니신가요?</p>
          <Linker to="https://www.clab.page/apply">동아리 지원하러 가기</Linker>
        </div>
      </div>
      <Footer />
    </main>
  );
}
