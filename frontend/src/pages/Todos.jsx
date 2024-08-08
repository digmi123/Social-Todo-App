import TodosComp from "../components/Todos";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function Todos() {
  return (
    <div className="grid grid-cols-[12rem_auto] gap-4 md:grid-cols-[5rem_auto] sm:grid-cols-[1fr] min-h-full p-4">
      <SideBar />
      <div className="grid grid-cols-[auto_3fr] sm:grid-rows-[min-content_1fr] sm:grid-cols-[1fr] gap-4 h-full">
        <Outlet />
        <TodosComp />
      </div>
    </div>
  );
}
