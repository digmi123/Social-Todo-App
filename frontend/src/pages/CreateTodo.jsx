import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function CreateTodo() {
  const navigate = useNavigate();
  const handleSubmit = () => (event) => {
    event.preventDefault();
    const data = {
      todo_title: event.target.todo_title.value,
      todo_description: event.target.todo_description.value,
    };
    axios.post("/api/todos/create_todo/", data).then(() => {
      navigate("/todos");
    });
  };
  return (
    <div className="grid grid-cols-[12rem_auto] gap-4 md:grid-cols-[5rem_auto] sm:grid-cols-[1fr] min-h-full p-4">
      <SideBar />
      <div className="grid grid-cols-[auto_3fr] sm:grid-rows-[min-content_1fr] sm:grid-cols-[1fr] gap-4 h-full">
        <Outlet />
        <main className="h-full flex items-center justify-center">
          <form
            className="flex flex-col p-6 gap-4 min-w-96 border border-slate-500 bg-color-white shadow-box-shadow rounded-xl"
            onSubmit={handleSubmit()}
          >
            <h1 className="font-bold text-3xl text-color-danger self-center">
              Create Todo
            </h1>

            <label className="font-medium text-xl text-color-primary">
              Title
            </label>
            <input
              type="text"
              className="p-1 border-2 border-solid border-slate-300 rounded-md flex-1 px-2 py-2 shadow-box-shadow"
              name="todo_title"
            />

            <label className="font-medium text-xl text-color-primary">
              Description
            </label>
            <textarea
              className="p-1 border-2 border-solid border-slate-300 rounded-md flex-1 px-2 py-2 shadow-box-shadow"
              name="todo_description"
            />
            <button className="bg-color-success px-2 py-1 rounded-md text-color-white">
              Create
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
