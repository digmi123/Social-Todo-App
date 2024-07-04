export default function FriendsList({ friends }) {
  return (
    <>
      <h2 className="m-0 font-bold text-xl">Friends</h2>

      {friends.length === 0 && <p>No friends yet</p>}

      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center justify-between gap-4 border-2 border-slate-300 rounded-md p-2"
        >
          <div className="flex gap-4 items-center">
            <span className="material-icons-sharp">account_circle</span>
            <h3>{friend.username}</h3>
          </div>
        </div>
      ))}
    </>
  );
}
