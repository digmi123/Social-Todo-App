import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";

export default function useTodo({ todoId }) {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState({});

  const addComment = (data) => {
    axios.post("/api/todos/comment_todo/", data);
    setTodo((prev) => {
      return {
        ...prev,
        comments: [
          ...prev.comments,
          { message: data.message, user: userInfo.user },
        ],
      };
    });
  };

  useEffect(() => {
    axios
      .get(`/api/todos/getTodo/${todoId}`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [todoId]);

  return { loading, todo, addComment };
}
