import PropTypes from "prop-types";
import axios from "axios";

// This component is for adding a new friend by pressing the Send request button after weve found the user
// we want to send the request.

export default function AddFriendCard({ searchedUser }) {
  const handleSubmit = (searchedUser) => (event) => {
    event.preventDefault();
    console.log("submitting friend request");
    axios.post("/api/user/send_friend_request/", {
      friend_id: searchedUser.id,
    });
  };

  return (
    <form
      className="flex items-center justify-between gap-4 border-2 border-solid border-slate-200 rounded-md p-2"
      onSubmit={handleSubmit(searchedUser)}
    >
      <div className="flex gap-4 items-center">
        <span className="material-icons-sharp">account_circle</span>
        <h3>{searchedUser.username}</h3>
      </div>

      <div className="self-end">
        <button className="bg-color-success px-2 py-1 rounded-md text-color-white cursor-pointer">
          Send request
        </button>
      </div>
    </form>
  );
}

AddFriendCard.propTypes = {
  searchedUser: PropTypes.obj,
};
