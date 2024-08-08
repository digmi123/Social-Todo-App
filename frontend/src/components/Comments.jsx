import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import ComentForm from "../Forms/ComentForm";

//  Comments compoennt which display the commentForm for submitting new comment,
//  and iterate over the comments from the backend data to display single comment component for each one of them.

export default function Comments({ comments, addComment }) {
  const { todo_id } = useParams();

  return (
    <>
      <ComentForm todoId={todo_id} addComment={addComment} />
      <div className="flex flex-col justify-between gap-4 py-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  addComment: PropTypes.func,
};
