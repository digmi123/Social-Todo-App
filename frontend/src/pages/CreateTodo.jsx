import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTodo() {
  const navigate = useNavigate();
  const handleSubmit = () => (event) => {
    event.preventDefault();
    const data = {
      todo_title: event.target.todo_title.value,
      todo_description: event.target.todo_description.value,
    };
    axios.post("/api/create_todo/", data).then(() => {
      // navigate("/home");
    });
  };
  return (
    <main className="h-full flex items-center justify-center">
      <form
        className="flex flex-col p-6 gap-4 border-2 border-slate-300 rounded-md min-w-96"
        onSubmit={handleSubmit()}
      >
        <h1 className="font-bold text-3xl">Create Todo</h1>

        <label>Title</label>
        <input
          type="text"
          className="border-2 border-slate-300"
          name="todo_title"
        />

        <label>Description</label>
        <textarea
          className="border-2 border-slate-300"
          name="todo_description"
        />
        <button>Create</button>
      </form>
    </main>
  );
}
