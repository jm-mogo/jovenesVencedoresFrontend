import App from "./App";

import TeensPage from "./Teens/TeensPage";
import ParentsPage from "./Parents/ParentsPage";
import TeenDetailPage from "./Teens/TeenDetailsPage";
import SeasonsPage from "./Seasons/SeasonsPage";
import SeasonDetailPage from "./Seasons/SeasonDetailPage";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "seasons", element: <SeasonsPage /> },
      { path: "seasons/:id", element: <SeasonDetailPage /> },
      { path: "teens", element: <TeensPage /> },
      { path: "teens/:id", element: <TeenDetailPage /> },
      { path: "parents", element: <ParentsPage /> },
    ],
  },
];

export default routes;
