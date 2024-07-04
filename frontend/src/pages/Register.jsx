import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };
    axios
      .post("/api/register/", data)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      className="flex flex-col p-6 gap-4 border-2 border-slate-300 rounded-md min-w-96"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-3xl">Register</h1>

      <label>Email</label>
      <input type="email" className="border-2 border-slate-300" name="email" />

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
      <button>Register</button>

      <p>
        Already have an account?
        <br />
        <span>
          <a href="/auth/login" className="underline">
            Login
          </a>
        </span>
      </p>
    </form>
  );
}
