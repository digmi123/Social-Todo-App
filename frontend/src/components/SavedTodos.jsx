import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TodoCard from "./TodoCard";
import useTodos from "../hooks/useTodos";
import Loader from "../loaders/Loader";

export default function SavedTodos() {
  const { todos, loading, removeTodo } = useTodos({
    url: "/api/todos/get_saved_todos/",
  });

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-[12rem_auto] gap-4 md:grid-cols-[5rem_auto] sm:grid-cols-[1fr] min-h-full p-4">
      <SideBar />
      <div className="grid grid-cols-[auto_3fr] sm:grid-rows-[min-content_1fr] sm:grid-cols-[1fr] gap-4 h-full">
        <Outlet />
        <ul className="list-none grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 m-0 h-fit">
          {todos.map((todo) => {
            return <TodoCard key={todo.id} todo={todo} onSave={removeTodo} />;
          })}
        </ul>
      </div>
    </div>
  );
}
