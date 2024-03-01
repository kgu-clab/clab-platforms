import { Suspense } from 'react';
import { PATH } from '@constants/path';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './AppLayout';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import MainPage from '@pages/MainPage/MainPage';
import CommunityPage from '@pages/CommunityPage/CommunityPage';
import CommunityDetailPage from '@pages/CommunityDetailPage/CommunityDetailPage';
import CommunityPostPage from '@pages/CommunityPostPage/CommunityPostPage';
import CommunityWritePage from '@pages/CommunityWritePage/CommunityWritePage';
import MyPage from '@pages/MyPage/MyPage';
import CalendarPage from '@pages/CalendarPage/CalendarPage';
import SupportPage from '@pages/SupportPage/SupportPage';
import LibraryPage from '@pages/LibraryPage/LibraryPage';
import LibraryDetailPage from '@pages/LibraryDetailPage/LibraryDetailPage';
import GroupPage from '@pages/GroupPage/GroupPage';
import GroupApplyPage from '@pages/GroupApplyPage/GroupApplyPage';
import GroupDetailPage from '@pages/GroupDetailPage/GroupDetailPage';
import GroupAssignmentPage from '@pages/GroupAssignmentPage/GroupAssignmentPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import AuthPage from '@pages/AuthPage/AuthPage';
import ProtectAuth from '@components/router/ProtectAuth';
import MyPageSkeleton from '@pages/MyPage/MyPageSkeleton';
import GroupConfigPage from '@pages/GroupConfigPage/GroupConfigPage';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.MAIN,
      element: (
        <Suspense>
          <AppLayout />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH.MAIN,
          element: (
            <Suspense>
              <MainPage />
            </Suspense>
          ),
        },
        {
          path: PATH.COMMUNITY,
          element: (
            <Suspense>
              <CommunityPage />
            </Suspense>
          ),
        },
        {
          path: PATH.COMMUNITY_POST,
          element: (
            <Suspense>
              <CommunityPostPage />
            </Suspense>
          ),
        },
        {
          path: PATH.COMMUNITY_DETAIL,
          element: (
            <Suspense>
              <CommunityDetailPage />
            </Suspense>
          ),
        },
        {
          path: PATH.COMMUNITY_WRITE,
          element: (
            <Suspense>
              <CommunityWritePage />
            </Suspense>
          ),
        },
        {
          path: PATH.ACTIVITY,
          element: (
            <Suspense>
              <GroupPage />
            </Suspense>
          ),
        },
        {
          path: PATH.ACTIVITY_APPLY,
          element: (
            <Suspense>
              <GroupApplyPage />
            </Suspense>
          ),
        },
        {
          path: PATH.ACTIVITY_DETAIL,
          element: (
            <Suspense>
              <GroupDetailPage />
            </Suspense>
          ),
        },
        {
          path: PATH.ACTIVITY_CONFIG,
          element: (
            <Suspense>
              <GroupConfigPage />
            </Suspense>
          ),
        },
        {
          path: PATH.ACTIVITY_ASSIGNMENT,
          element: (
            <Suspense>
              <GroupAssignmentPage />
            </Suspense>
          ),
        },
        {
          path: PATH.LIBRARY,
          element: (
            <Suspense>
              <LibraryPage />
            </Suspense>
          ),
        },
        {
          path: PATH.LIBRARY_DETAIL,
          element: (
            <Suspense>
              <LibraryDetailPage />
            </Suspense>
          ),
        },
        {
          path: PATH.MY,
          element: (
            <Suspense fallback={<MyPageSkeleton />}>
              <MyPage />
            </Suspense>
          ),
        },
        {
          path: PATH.CALENDER,
          element: (
            <Suspense>
              <CalendarPage />
            </Suspense>
          ),
        },
        {
          path: PATH.SUPPORT,
          element: (
            <Suspense>
              <SupportPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: PATH.MAIN,
      element: <ProtectAuth />,
      children: [
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
        },
        {
          path: PATH.AUTH,
          element: <AuthPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
