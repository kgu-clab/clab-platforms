import { lazy, Suspense } from 'react';
import { PATH } from '@constants/path';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './AppLayout';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import ProtectAuth from '@components/router/ProtectAuth';
import MyPageSkeleton from '@pages/MyPage/MyPageSkeleton';
import GroupConfigPage from '@pages/GroupConfigPage/GroupConfigPage';

const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const CommunityPage = lazy(() => import('@pages/CommunityPage/CommunityPage'));
const CommunityPostPage = lazy(
  () => import('@pages/CommunityPostPage/CommunityPostPage'),
);
const CommunityDetailPage = lazy(
  () => import('@pages/CommunityDetailPage/CommunityDetailPage'),
);
const CommunityWritePage = lazy(
  () => import('@pages/CommunityWritePage/CommunityWritePage'),
);
const GroupPage = lazy(() => import('@pages/GroupPage/GroupPage'));
const GroupApplyPage = lazy(
  () => import('@pages/GroupApplyPage/GroupApplyPage'),
);
const GroupDetailPage = lazy(
  () => import('@pages/GroupDetailPage/GroupDetailPage'),
);
const GroupNoticeDetailPage = lazy(
  () => import('@pages/GroupNoticeDetailPage/GroupNoticeDetailPage'),
);
const GroupStudentPage = lazy(
  () => import('@pages/GroupStudentPage/GroupStudentPage'),
);
const GroupAssignmentPage = lazy(
  () => import('@pages/GroupAssignmentPage/GroupAssignmentPage'),
);
const LibraryPage = lazy(() => import('@pages/LibraryPage/LibraryPage'));
const LibraryDetailPage = lazy(
  () => import('@pages/LibraryDetailPage/LibraryDetailPage'),
);
const MyPage = lazy(() => import('@pages/MyPage/MyPage'));
const CalendarPage = lazy(() => import('@pages/CalendarPage/CalendarPage'));
const SupportPage = lazy(() => import('@pages/SupportPage/SupportPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const AuthPage = lazy(() => import('@pages/AuthPage/AuthPage'));

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.MAIN,
      element: <AppLayout />,
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
