// import { useState } from "react";
import axios from "axios";
import { Link, NavLink, useLocation } from "react-router-dom";

const handleLogout = () => {
  console.log("logout");
  // axios.post("/api/auth/logout/");
};

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
  // const [active, setActive] = useState(0);

  return (
    <aside className="flex flex-col justify-between bg-color-white shadow-box-shadow rounded-xl h-full top-6 ease-in duration-300">
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

      {/* Active class added */}
      {/* <a className="flex items-center justify-center text-color-info-dark h-[3.5rem] gap-4 relative ease-in duration-300 text-color-primary bg-color-light"> */}
    </aside>
  );
}
