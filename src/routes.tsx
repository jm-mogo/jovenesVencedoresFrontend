import App from "./App";

import TeensPage from "./Pages/Teens/TeensPage";
import ParentsPage from "./Pages/Parents/ParentsPage";
import TeenDetailPage from "./Pages/TeenDetails/TeenDetailsPage";
import SeasonsPage from "./Pages/Seasons/SeasonsPage";
import SeasonDetailPage from "./Pages/SeasonDetails/SeasonDetailPage";
import TeamManagementPage from "./Pages/TeamManagement/TeamManagementPage";
import MeetingManagementPage from "./Pages/MeetingManagement/MeetingManagementPage";
import LoginPage from "./Pages/Login/LoginPage";
import AdminPage from "./Pages/Admin/AdminPage";
import GroupDetailsPage from "./Pages/GroupPages/GroupDetailsPage";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import WorkGroupPage from "./Pages/GroupPages/WorkGroupPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "seasons", element: <SeasonsPage /> },
      { path: "seasons/:id", element: <SeasonDetailPage /> },
      { path: "teams/:id", element: <TeamManagementPage /> },
      { path: "meetings/:id", element: <MeetingManagementPage /> },
      { path: "teens", element: <TeensPage /> },
      { path: "teens/:id", element: <TeenDetailPage /> },
      { path: "parents", element: <ParentsPage /> },
      { path: "workgroup", element: <WorkGroupPage /> },
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
