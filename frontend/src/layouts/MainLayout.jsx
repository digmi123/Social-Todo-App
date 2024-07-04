import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[12rem_auto] md:grid-cols-[5rem_auto] sm:grid-cols-[1fr] min-h-full px-4">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
