import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    friend_requests: [],
    friends: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const acceptFriendRequest = (friend_request) => {
    axios
      .post("/api/accept_friend_request/", {
        friend_request_id: friend_request.id,
      })
      .catch((error) => {
        console.log(error);
        setUserInfo(userInfo);
      });

    setUserInfo((prev) => {
      return {
        ...prev,
        friends: [...prev.friends, friend_request.sender],
        friend_requests: prev.friend_requests.filter(
          (request) => request.id !== friend_request.id
        ),
      };
    });
  };

  const getUserInfo = useCallback(() => {
    axios
      .get("/api/getUserInfo/")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <UserContext.Provider
      value={{ userInfo, loading, error, acceptFriendRequest }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
