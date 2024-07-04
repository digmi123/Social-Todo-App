import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("auth/login");
  };
  return (
    <div className="flex justify-between p-4">
      <a className="no-underline text-black" href="/home">
        <h1 className="uppercase">Todos</h1>
      </a>

      <form className="flex items-center gap-4">
        <button onClick={handleLogout}>
          <a href="/login/">Logout</a>
        </button>
        <a href="/create_todo/">Create Todo</a>
      </form>
    </div>
  );
}
