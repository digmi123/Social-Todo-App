import axios from "axios";
import { useEffect, useState } from "react";

export default function useTodos() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const deleteTodo = (todoId) => {
    axios
      .delete(`/api/todos/delete_todo/${todoId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  useEffect(() => {
    axios
      .get("/api/todos/get_all_todos/")
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

  return { loading, todos, deleteTodo };
}
