import App from "./App";

import TeensTable from "./teensTable";
import ParentsTable from "./parentsTable";
import TeenDetails from "./teenDetails";
import Seasons from "./Seasons";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "seasons", element: <Seasons /> },
      { path: "teens", element: <TeensTable /> },
      { path: "teens/:id", element: <TeenDetails /> },
      { path: "parents", element: <ParentsTable /> },
    ],
  },
];

export default routes;
