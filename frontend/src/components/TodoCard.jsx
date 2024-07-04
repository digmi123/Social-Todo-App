import axios from "axios";
import Heart from "../assets/heart.svg?react";

export default function TodoCard({ todo }) {
  const handleLike = () => {
    axios.post("/api/like_todo/", {
      todo_id: todo.id,
    });
  };

  return (
    <li
      className="box-border p-4 flex flex-col justify-between gap-3 w-full border border-slate-500 bg-color-white shadow-box-shadow rounded-xl"
      key={todo.id}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="font-bold">
          <a href={`/todo/${todo.id}`}> {todo.todo_title}</a>
        </h2>
        <div>
          <label className="has-[:checked]:text-red-700 cursor-pointer">
            <input type="checkbox" hidden name="like" onChange={handleLike} />
            <Heart />
          </label>
        </div>
      </div>
      <p>{todo.todo_description}</p>
      <div className="todo-info">
        {/* <h3>@{todo.creator.username}</h3> */}
        <strong>{todo.pub_date} ago</strong>
      </div>
      <div className="flex w-full justify-end gap-4">
        <button className="min-w-6 bg-color-primary px-2 py-1 rounded-md text-color-white">
          Edit
        </button>
        <button className="min-w-6 bg-color-danger px-2 py-1 rounded-md text-color-white">
          Delete
        </button>
      </div>
    </li>
  );
}
