import TodoCard from "./TodoCard";
import useTodos from "../hooks/useTodos";

export default function Todos() {
  const { todos, loading } = useTodos();
  if (loading) return <h1>Loading</h1>;

  return (
    <ul className="list-none grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 m-0 h-fit">
      {todos.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}
