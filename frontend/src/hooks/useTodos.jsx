import axios from "axios";
import { useEffect, useState } from "react";

export default function useTodos() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/get_all_todos/")
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, todos };
}
