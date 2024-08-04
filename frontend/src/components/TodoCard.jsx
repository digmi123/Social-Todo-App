import axios from "axios";
import Heart from "../assets/heart.svg?react";
import Bookmark from "../assets/bookmark.svg?react";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

export default function TodoCard({ todo, deleteTodo }) {
  const navigate = useNavigate();
  const { userInfo, loading } = useUser();
  const handleLike = () => {
    axios.post("/api/todos/like_todo/", {
      todo_id: todo.id,
    });
  };

  const handleSave = () => {
    axios.post("/api/todos/save_todo/", {
      todo_id: todo.id,
    });
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <li
      className="box-border p-4 flex flex-col justify-between gap-3 w-full border border-slate-500 bg-color-white shadow-box-shadow rounded-xl"
      key={todo.id}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="font-bold">
          <a href={`/todo/${todo.id}`}> {todo.todo_title}</a>
        </h2>
        <div className="flex gap-1">
          <label className="has-[:checked]:text-red-700 cursor-pointer">
            <input type="checkbox" hidden name="like" onChange={handleLike} />
            <Heart />
          </label>

          <label className="has-[:checked]:text-red-700 cursor-pointer">
            <input type="checkbox" hidden name="like" onChange={handleSave} />
            <Bookmark />
          </label>
        </div>
      </div>
      <p>{todo.todo_description}</p>
      <div className="todo-info">
        <strong>{todo.pub_date} ago</strong>
        <h3>@{todo.creator.username}</h3>
      </div>

      <div className="flex w-full justify-end gap-4">
        <button
          className="min-w-6 bg-color-primary px-2 py-1 rounded-md text-color-white"
          onClick={() => navigate(`/edit_todo/${todo.id}`)}
          hidden={userInfo.user.email !== todo.creator.email}
        >
          Edit
        </button>
        <button
          className="min-w-6 bg-color-danger px-2 py-1 rounded-md text-color-white"
          onClick={() => deleteTodo(todo.id)}
          hidden={userInfo.user.email !== todo.creator.email}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

//userInfo.user.email === todo.creator.email
