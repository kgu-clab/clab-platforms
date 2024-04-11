import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Footer from '@components/common/Footer/Footer';
import Linker from '@components/common/Linker/Linker';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';
import ProtectAuth from '@components/router/ProtectAuth';
import { PATH } from '@constants/path';
import { MODE } from '@constants/environment';
import { FcHighPriority } from 'react-icons/fc';

const ErrorPage = () => {
  const error = useRouteError();
  let errorStatus: number | undefined = undefined;
  let errorMessage: string = 'Unknown error';

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
        <section>
          {MODE === 'development' && (
            <div className="fixed top-0 left-0 w-full p-4 text-sm bg-gray-100 border-t-4 border-red-500">
              <p className="font-semibold">Development Error Message:</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="flex flex-col items-center justify-center min-h-screen gap-4 section">
            <FcHighPriority size={128} />
            <div className="font-semibold text-center text-clab-main">
              {errorStatus && <h2 className="text-4xl">{errorStatus}</h2>}
              <h1 className="text-3xl">
                불편을 드려 죄송합니다. 오류가 발생했어요. 😭
              </h1>
            </div>
            <div className="text-center text-gray-500 break-keep">
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
        </section>
      </ScrollToTop>
    </ProtectAuth>
  );
};

export default ErrorPage;
