import { useUser } from "../providers/UserProvider";
import Notification from "./Notification";

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
            <Notification notification={notification} />
          </div>
        );
      })}
    </aside>
  );
}
