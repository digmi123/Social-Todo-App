import { Outlet } from "react-router-dom";
import useSavedTodos from "../hooks/useSavedTodos";
import SideBar from "./SideBar";
import TodoCard from "./TodoCard";

export default function SavedTodos() {
  const { savedTodos, loading } = useSavedTodos();

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="grid grid-cols-[12rem_auto] gap-4 md:grid-cols-[5rem_auto] sm:grid-cols-[1fr] min-h-full p-4">
      <SideBar />
      <div className="grid grid-cols-[auto_3fr] sm:grid-rows-[min-content_1fr] sm:grid-cols-[1fr] gap-4 h-full">
        <Outlet />
        <ul className="list-none grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 m-0 h-fit">
          {savedTodos.map((saved) => {
            return <TodoCard key={saved.todo.id} todo={saved.todo} />;
          })}
        </ul>
      </div>
    </div>
  );
}
