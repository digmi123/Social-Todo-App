import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import CreateTodo from "./pages/CreateTodo";
import Todo from "./components/Todo";
import Todos from "./components/Todos";
import FriendSection from "./components/FriendsSection";
import NotificationsBar from "./components/NotificationsBar";
import SavedTodos from "./components/SavedTodos";
import Favorites from "./components/Favorites";
import EditTodo from "./pages/EditTodo";

const router = createBrowserRouter([
  {
    path: "/todos",
    element: <Todos />,
    children: [
      { element: <div></div>, index: true },
      { path: "friends", element: <FriendSection /> },
      { path: "notifications", element: <NotificationsBar /> },
      // { path: "/settings", element: <FriendSection /> },
    ],
  },
  {
    path: "create_todo",
    element: <CreateTodo />,
    children: [
      { element: <div></div>, index: true },
      { path: "friends", element: <FriendSection /> },
      { path: "notifications", element: <NotificationsBar /> },
      // { path: "/settings", element: <FriendSection /> },
    ],
  },
  {
    path: "edit_todo/:todo_id",
    element: <EditTodo />,
    children: [
      { element: <div></div>, index: true },
      { path: "friends", element: <FriendSection /> },
      { path: "notifications", element: <NotificationsBar /> },
      // { path: "/settings", element: <FriendSection /> },
    ],
  },
  {
    path: "todo/:todo_id",
    element: <Todo />,
    children: [
      { element: <div></div>, index: true },
      { path: "friends", element: <FriendSection /> },
      { path: "notifications", element: <NotificationsBar /> },
      // { path: "/settings", element: <FriendSection /> },
    ],
  },
  {
    path: "favorites",
    element: <Favorites />,
    children: [
      { element: <div></div>, index: true },
      { path: "friends", element: <FriendSection /> },
      { path: "notifications", element: <NotificationsBar /> },
      // { path: "/settings", element: <FriendSection /> },
    ],
  },
  {
    path: "saved",
    element: <SavedTodos />,
    children: [
      { element: <div></div>, index: true },
      { path: "friends", element: <FriendSection /> },
      { path: "notifications", element: <NotificationsBar /> },
      // { path: "/settings", element: <FriendSection /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
