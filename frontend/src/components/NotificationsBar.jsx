import { useUser } from "../providers/UserProvider";

export default function NotificationsBar() {
  const { userInfo } = useUser();

  return (
    <aside className="max-h-[90vh] sticky top-4 flex flex-col gap-4 rounded-md bg-color-white shadow-box-shadow p-4">
      {userInfo.notifications?.map((notification) => {
        return (
          <div
            key={notification.id}
            className="flex items-center justify-between gap-4 rounded-md p-2 border-2 border-solid border-slate-200 shadow-box-shadow"
          >
            <div className="flex gap-4 items-center py-2 px-1">
              <span className="material-icons-sharp">account_circle</span>
              {notification.message ? (
                <p>
                  {`${notification.user.email} commented on your post "${notification.message}"`}
                </p>
              ) : (
                <p>{notification.user.email} liked your post</p>
              )}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
