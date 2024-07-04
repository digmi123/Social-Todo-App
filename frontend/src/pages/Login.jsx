import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    axios
      .post("/api/login/", data)
      .then(() => navigate("/home"))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form
      className="flex flex-col p-6 gap-4 border-2 border-slate-300 rounded-md min-w-96"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-3xl">Login</h1>

      <label>Username</label>
      <input
        type="text"
        className="border-2 border-slate-300"
        name="username"
      />

      <label>Password</label>
      <input
        type="password"
        className="border-2 border-slate-300"
        name="password"
      />
      <button>Login</button>

      <p>
        Havent signed up yet?
        <br />
        <span>
          <a href="/auth/register" className="underline">
            Register
          </a>
        </span>
      </p>
    </form>
  );
}
