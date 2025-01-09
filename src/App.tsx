import { Outlet } from "react-router-dom";
import { SidebarComponent } from "./Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex items-center justify-between bg-gray-900 p-4 text-white">
        <h1 className="text-xl font-bold">Jóvenes Vencedores</h1>
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="">
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="flex flex-col  md:flex-row">
        <div
          className={`md:block ${isSidebarOpen ? "absolute z-10" : "hidden"}`}
        >
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
