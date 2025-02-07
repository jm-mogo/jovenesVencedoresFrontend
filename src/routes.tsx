import App from "./App";

import TeensPage from "./Teens/TeensPage";
import ParentsPage from "./Parents/ParentsPage";
import TeenDetailPage from "./Teens/TeenDetailsPage";
import SeasonsPage from "./Seasons/SeasonsPage";
import SeasonDetailPage from "./Seasons/SeasonDetailPage";
import TeamManagementPage from "./Seasons/TeamManagementPage";
import MeetingManagementPage from "./Seasons/MeetingManagementPage";
import LoginPage from "./Login/LoginPage";
import AdminPage from "./Admin/AdminPage";
import GroupDetailsPage from "./Admin/GroupDetailsPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "seasons", element: <SeasonsPage /> },
      { path: "seasons/:id", element: <SeasonDetailPage /> },
      { path: "teams/:id", element: <TeamManagementPage /> },
      { path: "meetings/:id", element: <MeetingManagementPage /> },
      { path: "teens", element: <TeensPage /> },
      { path: "teens/:id", element: <TeenDetailPage /> },
      { path: "parents", element: <ParentsPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/groups/:id", element: <GroupDetailsPage /> },
  {
    path: "/admin",
    element: <AdminPage />,
  },
];

export default routes;
