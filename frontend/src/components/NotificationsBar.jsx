import { useUser } from "../providers/UserProvider";

export default function NotificationsBar() {
  const { loading, userInfo } = useUser();

  if (loading) return <h1>Loading</h1>;

  return (
    <aside className="flex flex-col gap-4 rounded-md bg-color-white shadow-box-shadow p-4">
      {userInfo.notifications.likes.map((like) => {
        return (
          <div
            key={like.id}
            className="flex items-center justify-between gap-4 rounded-md p-2 border-2 border-solid border-slate-200 shadow-box-shadow"
          >
            <div className="flex gap-4 items-center py-2 px-1">
              <span className="material-icons-sharp">account_circle</span>
              <p>
                {like.user.username} ({like.user.email}) Liked your todo {""}
                {`"${like.todo.todo_title}"`}
              </p>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
