import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import {
  ActivityHomePage,
  HomePage,
  StudyDetailPage,
  CommunityDetailPage,
  CommunityPage,
  LibraryPage,
  LibraryDetailPage,
  LibraryCreatePage,
  CommunityWritePage,
  ActivityCreatePage,
  MyPage,
  MyPostsPage,
  MyCommentsPage,
  MyLibraryPage,
  MyActivityPage,
} from "@/pages";
import { ROUTE } from "@/shared/config/route";
import ActivityLayout from "../layout/ActivityLayout";
import CommunityLayout from "../layout/CommunityLayout";

const activityRoutes = [
  {
    path: ROUTE.ACTIVITY,
    element: <ActivityLayout />,
    children: [{ index: true, element: <ActivityHomePage /> }],
  },
  {
    path: `${ROUTE.ACTIVITY}/:id`,
    element: <StudyDetailPage />,
  },
  { path: ROUTE.ACTIVITY_CREATE, element: <ActivityCreatePage /> },
];

const communityRoutes = [
  {
    path: ROUTE.COMMUNITY,
    element: <CommunityLayout />,
    children: [{ index: true, element: <CommunityPage /> }],
  },
  { path: `${ROUTE.COMMUNITY}/:id`, element: <CommunityDetailPage /> },
  { path: ROUTE.COMMUNITY_WRITE, element: <CommunityWritePage /> },
];

const libraryRoutes = [
  { path: ROUTE.LIBRARY, element: <LibraryPage /> },
  { path: `${ROUTE.LIBRARY}/:id`, element: <LibraryDetailPage /> },
  { path: ROUTE.LIBRARY_CREATE, element: <LibraryCreatePage /> },
];

const myRoutes = [
  { path: ROUTE.MY, element: <MyPage /> },
  { path: ROUTE.MY_POSTS, element: <MyPostsPage /> },
  { path: ROUTE.MY_COMMENTS, element: <MyCommentsPage /> },
  { path: ROUTE.MY_LIBRARY, element: <MyLibraryPage /> },
  { path: ROUTE.MY_ACTIVITY, element: <MyActivityPage /> },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      ...activityRoutes,
      ...communityRoutes,
      ...libraryRoutes,
      ...myRoutes,
    ],
  },
]);
