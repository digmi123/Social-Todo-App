import axios from "axios";
import { useEffect, useState } from "react";

export default function useTodo({ todoId }) {
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState({});

  // const optimisticComment = (comment) => {
  //   setTodo((prev) => {
  //     return {
  //       ...prev,
  //       comments: [...prev.comments, { message }],
  //     };
  //   });
  // };

  useEffect(() => {
    axios
      .get(`/api/getTodo/${todoId}`)
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

  return { loading, todo };
}
