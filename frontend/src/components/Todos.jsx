import TodoCard from "./TodoCard";
import useTodos from "../hooks/useTodos";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Todos() {
  const { todos, loading, deleteTodo } = useTodos();
  if (loading) return <h1>Loading</h1>;

  return (
    <div className="grid grid-cols-[12rem_auto] gap-4 md:grid-cols-[5rem_auto] sm:grid-cols-[1fr] min-h-full p-4">
      {/* <SideBar /> */}
      <SideBar />
      <div className="grid grid-cols-[auto_3fr] sm:grid-rows-[min-content_1fr] sm:grid-cols-[1fr] gap-4 h-full">
        <Outlet />
        <ul className="list-none grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 m-0 h-fit">
          {todos.map((todo) => {
            return (
              <TodoCard key={todo.id} todo={todo} deleteTodo={deleteTodo} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
