import { useState } from "react";
import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export default function AppLayout() {
  const [openSide, setOpenSide] = useState(true);

  function openSideBar() {
    setOpenSide(!openSide);
  }
  return (
    <div className="flex overflow-hidden ">
      <aside className="bg-[#9780BC] shadow-lg ">
        <div
          className={`bg-[#9780BC]  h-screen transition-all ease-in-out duration-300  overflow-hidden ${
            openSide ? "w-64" : "w-0"
          }`}
        >
          <SideBar />
        </div>
      </aside>

      <main className="flex-1 space-y-1 px-3 py-2 bg-[#EAEBEA] ">
        <div className="py-4 px-2  block">
          <LayoutDashboard
            className="z-90  border rounded cursor-pointer hover:bg-red-200 transition-all duration-200"
            onClick={openSideBar}
            size={20}
          />
        </div>

        <Outlet />
      </main>
    </div>
  );
}
