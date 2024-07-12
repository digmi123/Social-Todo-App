import axios from "axios";
import { useState } from "react";
import AddFriendCard from "./AddFriendCard";
import FriendsList from "./FriendsList";
import FriendRequests from "./FriendRequests";
import { useUser } from "../providers/UserProvider";

export default function FriendSection() {
  const { userInfo, loading, error } = useUser();
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searched_username = e.target.search.value;
    axios
      .post("/api/user/get_users_by_search/", {
        searched_username,
      })
      .then((response) => {
        setSearchedUsers(response.data);
      });
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <aside className="flex flex-col gap-4 bg-color-white shadow-box-shadow rounded-xl p-4">
      <form
        onSubmit={handleSearch}
        className="flex justify-between gap-4 border-2 border-solid border-slate-300 rounded-md shadow-box-shadow px-2 py-1"
      >
        <input
          type="text"
          name="search"
          placeholder="Search for new friends"
          className="p-1"
        />
        <button
          type="submit"
          className="bg-color-success px-2 py-1 rounded-md text-color-white"
        >
          Search
        </button>
      </form>

      {searchedUsers.length > 0 && (
        <>
          <h2>Search Results</h2>
          <ul>
            {searchedUsers.map((user) => {
              return <AddFriendCard key={user.id} searchedUser={user} />;
            })}
          </ul>
        </>
      )}

      <div className="flex flex-col gap-4 flex-1 border-slate-200 rounded-md">
        <FriendRequests friend_requests={userInfo.friend_requests} />
        <FriendsList friends={userInfo.friends} />
      </div>
    </aside>
  );
}
