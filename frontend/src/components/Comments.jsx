export default function Comments({ comments }) {
  return (
    <div className="flex flex-col justify-between gap-4 py-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 items-center">
          <span className="material-icons-sharp">account_circle</span>
          <div>
            <h3>{comment.user.email}</h3>
            <p>{comment.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
