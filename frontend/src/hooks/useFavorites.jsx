import axios from "axios";
import { useEffect, useState } from "react";

export default function useFavorites() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("/api/todos/get_liked_todos/")
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, favorites };
}
