import { isRouteErrorResponse, useRouteError } from 'react-router';

import { HighPriorityColor } from '@clab-platforms/icon';

import Footer from '@components/common/Footer/Footer';
import Linker from '@components/common/Linker/Linker';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';
import ProtectAuth from '@components/router/ProtectAuth';

import { IS_DEVELOPMENT } from '@constants/environment';
import { PATH } from '@constants/path';

export function GlobalErrorPage() {
  const error = useRouteError();
  let errorStatus: number | undefined = undefined;
  let errorMessage: string = 'Unknown Error';

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <ProtectAuth protect>
      <ScrollToTop>
        <main>
          {IS_DEVELOPMENT && (
            <div className="fixed left-0 top-0 w-full border-t-4 border-red-500 bg-gray-100 p-4 text-sm">
              <p className="font-semibold">Development Error Message:</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="section flex min-h-screen flex-col items-center justify-center gap-4">
            <HighPriorityColor width={128} height={128} />
            <div className="text-clab-main text-center font-semibold">
              {errorStatus && <h2 className="text-4xl">{errorStatus}</h2>}
              <h1 className="text-3xl">
                불편을 드려 죄송합니다. 오류가 발생했어요. 😭
              </h1>
            </div>
            <div className="break-keep text-center text-gray-500">
              <p>
                만약 같은 문제가 지속적으로 발생할 경우 문의 해주시기 바랍니다.
              </p>
              <p>감사합니다.</p>
            </div>
            <div className="flex gap-4">
              <Linker
                to={PATH.MAIN}
                className="text-sky-500 hover:text-sky-600"
              >
                메인으로
              </Linker>
              <Linker to={-1} className="text-gray-500 hover:text-gray-600">
                이전페이지
              </Linker>
            </div>
          </div>
          <Footer />
        </main>
      </ScrollToTop>
    </ProtectAuth>
  );
}
