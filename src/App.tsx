import { Outlet } from "react-router-dom";
import { SidebarComponent } from "./Sidebar";

function App() {
  return (
    <>
      <div className="flex flex-col  md:flex-row">
        <SidebarComponent />

        <div className="w-full space-y-4 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
