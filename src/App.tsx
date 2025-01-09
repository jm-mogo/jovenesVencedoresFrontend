import { Outlet } from "react-router-dom";
import { SidebarComponent } from "./Sidebar";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <SidebarComponent />
        <div className="w-full space-y-4 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
