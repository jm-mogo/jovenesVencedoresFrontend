import App from "./App";

import TeensPage from "./Pages/Teens/TeensPage";
// import ParentsPage from "./Pages/Parents/ParentsPage";
import TeenDetailPage from "./Pages/TeenDetails/TeenDetailsPage";
// import SeasonsPage from "./Pages/Seasons/SeasonsPage";
// import SeasonDetailPage from "./Pages/Seasons/SeasonDetailPage";
// import TeamManagementPage from "./Pages/Seasons/TeamManagementPage";
// import MeetingManagementPage from "./Pages/Seasons/MeetingManagementPage";
import LoginPage from "./Pages/Login/LoginPage";
import AdminPage from "./Pages/Admin/AdminPage";
import GroupDetailsPage from "./Pages/GroupDetails/GroupDetailsPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "seasons", element: <SeasonsPage /> },
      // { path: "seasons/:id", element: <SeasonDetailPage /> },
      // { path: "teams/:id", element: <TeamManagementPage /> },
      // { path: "meetings/:id", element: <MeetingManagementPage /> },
      { path: "teens", element: <TeensPage /> },
      { path: "teens/:id", element: <TeenDetailPage /> },
      // { path: "parents", element: <ParentsPage /> },
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
