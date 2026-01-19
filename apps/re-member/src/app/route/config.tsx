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
  CommunityWritePage,
} from "@/pages";
import { ROUTE } from "@/shared/config/route";
import ActivityLayout from "../layout/ActivityLayout";
import CommunityLayout from "../layout/CommunityLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTE.ACTIVITY,
        element: <ActivityLayout />,
        children: [{ index: true, element: <ActivityHomePage /> }],
      },
      {
        path: `${ROUTE.ACTIVITY}/:id`,
        children: [{ index: true, element: <StudyDetailPage /> }],
      },
      {
        path: ROUTE.COMMUNITY,
        element: <CommunityLayout />,
        children: [{ index: true, element: <CommunityPage /> }],
      },
      { path: `${ROUTE.COMMUNITY}/:id`, element: <CommunityDetailPage /> },
      { path: ROUTE.COMMUNITY_WRITE, element: <CommunityWritePage /> },
      { path: ROUTE.LIBRARY, element: <LibraryPage /> },
      { path: `${ROUTE.LIBRARY}/:id`, element: <LibraryDetailPage /> },
    ],
  },
]);
