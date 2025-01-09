import App from "./App";

import TeensTable from "./teensTable";
import ParentsTable from "./parentsTable";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "teens", element: <TeensTable /> },
      { path: "parents", element: <ParentsTable /> },
    ],
  },
];

export default routes;
