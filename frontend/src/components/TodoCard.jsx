import PropTypes from "prop-types";
import axios from "axios";
import Heart from "../assets/heart.svg?react";
import Bookmark from "../assets/bookmark.svg?react";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const timeOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

// Component which display each todo information in a card and use the functions it gets (if getting any).
export default function TodoCard({ todo, onSave, onLike, onDelete }) {
  const [isLiked, setIsLiked] = useState(todo.liked);
  const [isSaved, setIsSaved] = useState(todo.saved);

  const timeString = new Date(todo.pub_date).toLocaleString(
    "en-US",
    timeOptions
  );

  const navigate = useNavigate();
  const { userInfo } = useUser();

  const handleDelete = () => {
    // Deletes the current Todo.
    if (onDelete) onDelete(todo);
  };

  const handleLike = () => {
    // The onLike method is used for toggling the liked todo from the todos list.
    if (onLike) onLike(todo);
    setIsLiked((prev) => !prev);
    axios.post("/api/todos/like_todo/", {
      todo_id: todo.id,
    });
  };

  const handleSave = () => {
    // The onSave method is used for toggling the saved todo from the todos list.
    if (onSave) onSave(todo);
    setIsSaved((prev) => !prev);
    axios.post("/api/todos/save_todo/", {
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
        <div className="flex gap-1">
          <label>
            <input type="checkbox" hidden name="like" onChange={handleLike} />
            <Heart
              fill={isLiked ? "var(--color-liked)" : "#ffffff"}
              stroke="currentColor"
            />
          </label>

          <label>
            <input type="checkbox" hidden name="like" onChange={handleSave} />
            <Bookmark
              fill={isSaved ? "var(--color-saved)" : "#ffffff"}
              stroke="currentColor"
            />
          </label>
        </div>
      </div>
      <p>{todo.todo_description}</p>
      <div className="todo-info">
        <strong>{timeString}</strong>
        <h3>@{todo.creator.username}</h3>
      </div>

      {/* Showing the delete and edit buttons only if the creator of the todo is the same user whos logged in. */}
      <div className="flex w-full justify-end gap-4">
        <button
          className="min-w-6 bg-color-primary px-2 py-1 rounded-md text-color-white"
          onClick={() => navigate(`/edit_todo/${todo.id}`)}
          hidden={userInfo.user?.email !== todo.creator.email}
        >
          Edit
        </button>
        <button
          className="min-w-6 bg-color-danger px-2 py-1 rounded-md text-color-white"
          onClick={handleDelete}
          hidden={userInfo.user?.email !== todo.creator.email}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

TodoCard.propTypes = {
  todo: PropTypes.object,
  onSave: PropTypes.func,
  onLike: PropTypes.func,
  onDelete: PropTypes.func,
};
