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
import GroupPage from '@pages/GroupPage/GroupPage';
import GroupCreatePage from '@pages/GroupCreatePage/GroupCreatePage';
import GroupDetailPage from '@pages/GroupDetailPage/GroupDetailPage';
import GroupNoticeDetailPage from '@pages/GroupNoticeDetailPage/GroupNoticeDetailPage';
import GroupStudentPage from '@pages/GroupStudentPage/GroupStudentPage';
import GroupAssignmentPage from '@pages/GroupAssignmentPage/GroupAssignmentPage';

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
        { path: PATH.MY, element: <MyPage /> },
        { path: PATH.CALENDER, element: <CalendarPage /> },
        { path: PATH.SUPPORT, element: <SupportPage /> },
        { path: PATH.GROUP, element: <GroupPage /> },
        { path: PATH.CREATE_GROUP, element: <GroupCreatePage /> },
        { path: PATH.GROUP_DETAIL, element: <GroupDetailPage /> },
        { path: PATH.GROUP_NOTICE, element: <GroupNoticeDetailPage /> },
        { path: PATH.GROUP_STUDENT, element: <GroupStudentPage /> },
        { path: PATH.ASSIGNMENT_UPLOAD, element: <GroupAssignmentPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
