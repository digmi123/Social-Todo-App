import axios from "axios";
import { useEffect, useState } from "react";

export default function useTodos({ url }) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const deleteTodo = (todo) => {
    axios
      .delete(`/api/todos/delete_todo/${todo.id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    removeTodo(todo);
  };

  const removeTodo = (todo) => {
    setTodos((prev) => prev.filter((currTodo) => currTodo.id !== todo.id));
  };

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { loading, todos, deleteTodo, removeTodo };
}
