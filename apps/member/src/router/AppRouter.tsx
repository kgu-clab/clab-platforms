import { PATH } from '@constants/path';
import MainPage from '@pages/MainPage/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.MAIN,
      element: <MainPage />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
