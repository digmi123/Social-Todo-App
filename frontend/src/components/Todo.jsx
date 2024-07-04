import { useParams } from "react-router-dom";
import useTodo from "../hooks/useTodo";
import NotificationsBar from "./NotificationsBar";
import axios from "axios";
import Comments from "./Comments";
import FriendSection from "./FriendsSection";

export default function Todo() {
  const { todo_id } = useParams();
  const { todo, loading } = useTodo({ todoId: todo_id });

  console.log({ todo });

  const handleComment = () => (event) => {
    event.preventDefault();
    const data = {
      todo: todo_id,
      message: event.target.comment.value,
    };
    axios.post("/api/comment_todo/", data);
  };

  console.log({ todo });

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="grid grid-cols-[1fr_3fr_1.5fr] gap-x-4 p-4 h-full">
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

        <div>
          <form className="flex gap-4" onSubmit={handleComment()}>
            <input
              type="text"
              name="comment"
              placeholder="Comment here"
              className="p-1 border-2 border-slate-300 rounded-md flex-1 px-2 py-2 shadow-box-shadow"
            />
            <button type="submit">Comment</button>
          </form>
        </div>

        <Comments comments={todo.comments} />
      </main>
      <NotificationsBar />
    </div>
  );
}
