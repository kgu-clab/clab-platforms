import { PATH } from '@constants/path';
import MainPage from '@pages/MainPage/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './AppLayout';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import MyPage from '@pages/MyPage/MyPage';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.MAIN,
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: PATH.MAIN, element: <MainPage /> },
        { path: PATH.MY, element: <MyPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
