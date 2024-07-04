import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
