import { Outlet } from "react-router-dom";
import { SidebarComponent } from "./Components/Sidebar";

function App() {
  return (
    <>
      <div className="flex flex-row">
        <div className="sticky top-0 h-screen">
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
