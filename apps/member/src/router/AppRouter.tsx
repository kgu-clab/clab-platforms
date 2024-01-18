import { PATH } from '@constants/path';
import MainPage from '@pages/MainPage/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './AppLayout';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import CommunityPage from '@pages/CommunityPage/CommunityPage';
import CommunityDetailPage from '@pages/CommunityPage/CommunityDetailPage';
import CommunityPostPage from '@pages/CommunityPage/CommunityPostPage';
import CommunityWritePage from '@pages/CommunityPage/CommunityWritePage';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.MAIN,
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: PATH.MAIN, element: <MainPage /> },
        { path: PATH.COMMUNITY, element: <CommunityPage /> },
        { path: PATH.COMMUNITY_DETAIL, element: <CommunityDetailPage /> },
        { path: PATH.COMMUNITY_POST, element: <CommunityPostPage /> },
        { path: PATH.COMMUNITY_WRITE, element: <CommunityWritePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
