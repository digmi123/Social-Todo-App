import { useUser } from "../providers/UserProvider";

export default function FriendRequests({ friend_requests }) {
  const { acceptFriendRequest } = useUser();
  return (
    <>
      {friend_requests.length > 0 && (
        <>
          <h2>Incoming requests</h2>
          {friend_requests.map((friendRequest) => (
            <form
              key={friendRequest.id}
              className="flex items-center justify-between gap-4 border-2 border-slate-200 rounded-md p-2"
              onSubmit={() => acceptFriendRequest(friendRequest)}
            >
              <div className="flex gap-4 items-center">
                <span className="material-icons-sharp">account_circle</span>
                <h3>{friendRequest.sender.username}</h3>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="min-w-6 bg-color-primary px-2 py-1 rounded-md text-color-white"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="min-w-6 bg-color-danger px-2 py-1 rounded-md text-color-white"
                >
                  Ignore
                </button>
              </div>
            </form>
          ))}
        </>
      )}
    </>
  );
}
