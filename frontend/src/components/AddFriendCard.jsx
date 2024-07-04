import axios from "axios";

export default function AddFriendCard({ searchedUser }) {
  const handleSubmit = (searchedUser) => (event) => {
    event.preventDefault();
    console.log("submitting friend request");
    axios.post("/api/send_friend_request/", {
      friend_id: searchedUser.id,
    });
  };

  return (
    <form
      className="flex items-center justify-between gap-4 border-2 border-slate-300 rounded-md p-2"
      onSubmit={handleSubmit(searchedUser)}
    >
      <div className="flex gap-4 items-center">
        <div className="w-[40px] h-[40px] rounded-full border-2 border-black"></div>
        <h3>{searchedUser.username}</h3>
      </div>

      <div className="self-end">
        <button className="cursor-pointer">Send request</button>
      </div>
    </form>
  );
}
