import axios from "axios";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Feed",
    icon: "dashboard",
    routePath: "/todos",
  },
  {
    name: "Friends",
    icon: "group",
    routePath: "friends",
  },
  {
    name: "Notifications",
    icon: "notifications",
    routePath: "notifications",
  },
  {
    name: "Saved",
    icon: "bookmarks",
    routePath: "../saved",
  },
  {
    name: "Favorites",
    icon: "favorite",
    routePath: "../favorites",
  },
  {
    name: "Create",
    icon: "add_circle_outline",
    routePath: "../create_todo",
  },
];

export default function SideBar() {
  const handleLogout = () => {
    axios.post("/api/auth/logout/");
  };

  return (
    <aside className="sticky top-4 max-h-[90vh] flex flex-col justify-between bg-color-white shadow-box-shadow rounded-xl h-full ease-in duration-300">
      <div className="flex flex-col hover:shadow-none cursor-pointer">
        {menuItems.map((menuItem) => {
          return (
            <NavLink
              key={menuItem.name}
              className="flex items-center ms-4 text-color-info-dark h-[3.5rem] gap-4 relative ease-in duration-300 hover:text-color-primary md:mx-auto"
              to={`${menuItem.routePath}`}
            >
              <span className="material-icons-sharp ease-in duration-300 text-2xl hover:ml-3">
                {menuItem.icon}
              </span>
              <div className="sm:inline md:hidden">{menuItem.name}</div>
            </NavLink>
          );
        })}
      </div>

      <div className="flex flex-col hover:shadow-none cursor-pointer">
        <NavLink
          onClick={handleLogout}
          key="Logout"
          to={"../auth/login"}
          className="flex items-center ms-4 text-color-info-dark h-[3.5rem] gap-4 relative ease-in duration-300 hover:text-color-primary md:mx-auto"
        >
          <span className="material-icons-sharp ease-in duration-300 text-2xl hover:ml-3">
            group
          </span>
          <div className="sm:inline md:hidden">Logout</div>
        </NavLink>
      </div>
    </aside>
  );
}
