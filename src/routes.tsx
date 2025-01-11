import App from "./App";

import TeensPage from "./Teens/TeensPage";
import ParentsTable from "./parentsTable";
import TeenDetails from "./TeenDetails";
import Seasons from "./Seasons";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "seasons", element: <Seasons /> },
      { path: "teens", element: <TeensPage /> },
      { path: "teens/:id", element: <TeenDetails /> },
      { path: "parents", element: <ParentsTable /> },
    ],
  },
];

export default routes;
