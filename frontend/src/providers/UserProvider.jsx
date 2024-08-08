import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../loaders/Loader";

const UserContext = createContext();

export default function UserProvider() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    user: {},
    friend_requests: [],
    friends: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const acceptFriendRequest = (friend_request) => {
    axios
      .post("/api/user/accept_friend_request/", {
        friend_request_id: friend_request.id,
      })
      .catch((error) => {
        console.log(error);
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
      .get("/api/user/getUserInfo/")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        setError(true);
        console.error(error);
        if (error.response.status === 403) {
          navigate("/auth/login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (loading) return <Loader />;

  return (
    <UserContext.Provider value={{ userInfo, error, acceptFriendRequest }}>
      <Outlet />
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
