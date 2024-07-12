import axios from "axios";
import { useEffect, useState } from "react";

export default function useSavedTodos() {
  const [loading, setLoading] = useState(true);
  const [savedTodos, setSavedTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/todos/get_saved_todos/")
      .then((response) => {
        setSavedTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, savedTodos };
}
