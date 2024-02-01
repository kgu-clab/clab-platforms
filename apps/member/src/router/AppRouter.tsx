import { PATH } from '@constants/path';
import MainPage from '@pages/MainPage/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './AppLayout';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
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
import GroupNoticeDetailPage from '@pages/GroupNoticeDetailPage/GroupNoticeDetailPage';
import GroupStudentPage from '@pages/GroupStudentPage/GroupStudentPage';
import GroupAssignmentPage from '@pages/GroupAssignmentPage/GroupAssignmentPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import AuthPage from '@pages/AuthPage/AuthPage';
import ProtectAuth from '@components/router/ProtectAuth';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.MAIN,
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: PATH.MAIN, element: <MainPage /> },
        { path: PATH.COMMUNITY, element: <CommunityPage /> },
        { path: PATH.COMMUNITY_POST, element: <CommunityPostPage /> },
        { path: PATH.COMMUNITY_DETAIL, element: <CommunityDetailPage /> },
        { path: PATH.COMMUNITY_WRITE, element: <CommunityWritePage /> },
        { path: PATH.ACTIVITY, element: <GroupPage /> },
        { path: PATH.ACTIVITY_APPLY, element: <GroupApplyPage /> },
        { path: PATH.ACTIVITY_DETAIL, element: <GroupDetailPage /> },
        { path: PATH.ACTIVITY_NOTICE, element: <GroupNoticeDetailPage /> },
        { path: PATH.ACTIVITY_STUDENT, element: <GroupStudentPage /> },
        { path: PATH.ACTIVITY_ASSIGNMENT, element: <GroupAssignmentPage /> },
        { path: PATH.LIBRARY, element: <LibraryPage /> },
        { path: PATH.LIBRARY_DETAIL, element: <LibraryDetailPage /> },
        { path: PATH.MY, element: <MyPage /> },
        { path: PATH.CALENDER, element: <CalendarPage /> },
        { path: PATH.SUPPORT, element: <SupportPage /> },
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
