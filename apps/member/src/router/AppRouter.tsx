import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { SectionSkeleton } from '@components/common/Section';
import ProtectAuth from '@components/router/ProtectAuth';

import { PATH } from '@constants/path';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import MyPageSkeleton from '@pages/MyPage/MyPageSkeleton';

import AppLayout from './AppLayout';

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
const GroupAssignmentPage = lazy(
  () => import('@pages/GroupAssignmentPage/GroupAssignmentPage'),
);
const GroupConfigPage = lazy(
  () => import('@pages/GroupConfigPage/GroupConfigPage'),
);
const GroupCreatePage = lazy(
  () => import('@pages/GroupCreatePage/GroupCreatePage'),
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
const BlogPage = lazy(() => import('@pages/BlogPage/BlogPage'));
const ManagePage = lazy(() => import('@pages/ManagePage/ManagePage'));

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
            <Suspense fallback={<SectionSkeleton />}>
              <MainPage />
            </Suspense>
          ),
        },
        {
          path: PATH.COMMUNITY,
          element: (
            <Suspense fallback={<SectionSkeleton />}>
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
          path: PATH.BLOG_DETAIL,
          element: (
            <Suspense>
              <BlogPage />
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
          path: PATH.ACTIVITY_CREATE,
          element: (
            <Suspense>
              <GroupCreatePage />
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
        {
          path: PATH.MANAGE,
          element: (
            <Suspense>
              <ManagePage />
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
