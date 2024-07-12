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
      .post("/api/auth/login/", data)
      .then(() => navigate("/todos"))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form
      className="flex flex-col p-6 gap-4 min-w-96 border border-slate-500 bg-color-white shadow-box-shadow rounded-xl"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-3xl text-color-danger self-center">
        Login
      </h1>

      <label className="font-medium text-xl text-color-primary">Username</label>
      <input
        type="text"
        className="p-1 border-2 border-solid border-slate-300 rounded-md flex-1 px-2 py-2 shadow-box-shadow"
        name="username"
      />

      <label className="font-medium text-xl text-color-primary">Password</label>
      <input
        type="password"
        className="p-1 border-2 border-solid border-slate-300 rounded-md flex-1 px-2 py-2 shadow-box-shadow"
        name="password"
      />
      <button className="bg-color-success px-2 py-1 rounded-md text-color-white">
        Login
      </button>

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
