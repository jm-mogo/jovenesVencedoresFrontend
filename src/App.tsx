import { Outlet } from "react-router-dom";
import { SidebarComponent } from "./Components/Sidebar";

import NavMenu from "./Components/navMenu";

function App() {
  return (
    <>
      <NavMenu />
      <div className="flex flex-row">
        <div className="sticky top-0 hidden h-screen bg-gray-100 p-6 md:block">
          <SidebarComponent />
        </div>

        <div className="w-full space-y-4 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
