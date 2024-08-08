import useTodos from "../hooks/useTodos";
import SkeletonTodo from "../loaders/SkeletonTodo";
import TodoCard from "./TodoCard";

export default function Todos() {
  const { todos, loading, deleteTodo } = useTodos({
    url: "/api/todos/get_all_todos/",
  });

  if (loading)
    return (
      <ul className="list-none grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 m-0 h-fit">
        {Array.from({ length: 10 }).map((_, index) => {
          return <SkeletonTodo key={index} />;
        })}
      </ul>
    );

  return (
    <ul className="list-none grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 m-0 h-fit">
      {todos.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} onDelete={deleteTodo} />;
      })}
    </ul>
  );
}
