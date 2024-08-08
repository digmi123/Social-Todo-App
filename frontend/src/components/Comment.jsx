import PropTypes from "prop-types";

// Single comment component.
export default function Comment({ comment }) {
  return (
    <div key={comment.id} className="flex gap-4 items-center">
      <span className="material-icons-sharp">account_circle</span>
      <div>
        <h3>{comment.user.email}</h3>
        <p>{comment.message}</p>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};
