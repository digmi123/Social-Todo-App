import PropTypes from "prop-types";
import axios from "axios";
import { useRef } from "react";

export default function ComentForm({ todoId, addComment }) {
  const formRef = useRef(null);

  const handleComment = () => (event) => {
    event.preventDefault();
    const data = {
      todo: todoId,
      message: event.target.comment.value,
    };
    addComment(data);
    formRef.current.reset();
    axios.post("/api/user/comment_todo/", data);
  };

  return (
    <div>
      <form className="flex gap-4" onSubmit={handleComment()} ref={formRef}>
        <input
          type="text"
          name="comment"
          placeholder="Comment here"
          className="p-1 border-2 border-solid border-slate-300 rounded-md flex-1 px-2 py-2 shadow-box-shadow"
        />
        <button
          type="submit"
          className="bg-color-success px-2 py-1 rounded-md text-color-white"
        >
          Comment
        </button>
      </form>
    </div>
  );
}

ComentForm.propTypes = {
  todoId: PropTypes.string,
  addComment: PropTypes.func,
};
