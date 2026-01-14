import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import { ActivityHomePage, HomePage, StudyDetailPage } from "@/pages";
import { ROUTE } from "@/shared/config/route";
import ActivityLayout from "../layout/ActivityLayout";

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
    ],
  },
]);
