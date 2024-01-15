import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { BiMessageAltError } from 'react-icons/bi';
import Footer from '@components/common/Footer/Footer';
import Linker from '@components/common/Linker/Linker';

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
    <section>
      <div className="section flex min-h-screen flex-col items-center justify-center gap-4">
        <BiMessageAltError className="h-20 w-20" />
        <div className="text-center">
          <h1 className="text-5xl text-clab-main">{`${errorStatus || '오류'} ${
            errorMessage || 'ERROR'
          }`}</h1>
          <h2 className="mt-2 text-xl">
            불편을 드려 죄송합니다. 오류가 발생했어요. 😭
          </h2>
        </div>
        <div className="break-keep text-center text-gray-500">
          <p>만약 같은 문제가 지속적으로 발생할 경우 문의 해주시기 바랍니다.</p>
          <p>감사합니다.</p>
        </div>
        <div className="flex gap-4">
          <Linker to="/" className="text-sky-500 hover:text-sky-600">
            메인으로
          </Linker>
          <Linker to={-1} className="text-gray-500 hover:text-gray-600">
            이전페이지
          </Linker>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ErrorPage;
