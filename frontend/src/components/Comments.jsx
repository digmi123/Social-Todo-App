import axios from "axios";
import { useParams } from "react-router-dom";

export default function Comments({ comments, addComment }) {
  const { todo_id } = useParams();

  const handleComment = () => (event) => {
    event.preventDefault();
    const data = {
      todo: todo_id,
      message: event.target.comment.value,
    };
    addComment(data);
    axios.post("/api/user/comment_todo/", data);
  };
  return (
    <>
      <div>
        <form className="flex gap-4" onSubmit={handleComment()}>
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
      <div className="flex flex-col justify-between gap-4 py-4">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="flex gap-4 items-center">
              <span className="material-icons-sharp">account_circle</span>
              <div>
                <h3>{comment.user.email}</h3>
                <p>{comment.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
