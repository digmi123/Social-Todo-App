import useTodo from "../hooks/useTodo";
import NotificationsBar from "./NotificationsBar";
import Comments from "./Comments";
import FriendSection from "./FriendsSection";
import { useParams } from "react-router-dom";

export default function Todo() {
  const { todo_id } = useParams();
  const { todo, loading, addComment } = useTodo({
    todoId: todo_id,
  });

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="grid grid-cols-[1fr_3fr_1.5fr] sm:grid-cols-[1fr] sm:grid-rows-[1fr] sm:gap-y-4 gap-x-4 p-4 min-h-full">
      <FriendSection />
      <main className="px-4">
        <div className="flex gap-4 items-center">
          <span className="material-icons-sharp">account_circle</span>
          <h3>{todo.creator.email}</h3>
        </div>

        <div className="py-8">
          <h1 className="font-bold text-3xl py-4">{todo.todo_title}</h1>
          <h4 className="text-2xl">{todo.todo_description}</h4>
        </div>

        <Comments comments={todo.comments} addComment={addComment} />
      </main>
      <NotificationsBar />
    </div>
  );
}
