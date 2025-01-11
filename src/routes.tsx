import App from "./App";

import TeensPage from "./Teens/TeensPage";
import ParentsPage from "./Parents/ParentsPage";
import TeenDetails from "./Teens/TeenDetailsPage";
import SeasonsPage from "./Seasons/SeasonsPage";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "seasons", element: <SeasonsPage /> },
      { path: "teens", element: <TeensPage /> },
      { path: "teens/:id", element: <TeenDetails /> },
      { path: "parents", element: <ParentsPage /> },
    ],
  },
];

export default routes;
