import FriendsList from "./FriendsList";
import FriendRequests from "./FriendRequests";
import { useUser } from "../providers/UserProvider";
import NewFriendsSearch from "./NewFriendsSearch";

// This component acts as a wrapper for all the different components we need to display the friends list
// and the functionallity for adding new friends and accepting requests.
export default function FriendSection() {
  const { userInfo } = useUser();

  return (
    <aside className="max-h-[90vh] sticky sm:static top-4 flex flex-col gap-4 bg-color-white shadow-box-shadow rounded-xl p-4">
      <NewFriendsSearch />
      <div className="flex flex-col gap-4 flex-1 border-slate-200 rounded-md">
        <FriendRequests friend_requests={userInfo.friend_requests} />
        <FriendsList friends={userInfo.friends} />
      </div>
    </aside>
  );
}
