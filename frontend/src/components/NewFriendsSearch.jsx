import { useState } from "react";
import FriendsSearchForm from "../Forms/FriendsSearchForm";
import AddFriendCard from "../components/AddFriendCard";
import axios from "axios";

export default function NewFriendsSearch() {
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
  return (
    <>
      <FriendsSearchForm handleSearch={handleSearch} />
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
    </>
  );
}
