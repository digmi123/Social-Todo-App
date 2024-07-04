import { useState } from "react";
import reactLogo from "../assets/react.svg";

const menuItems = [
  {
    name: "Dashboard",
    icon: "dashboard",
  },
  {
    name: "Friends",
    icon: "group",
  },
  {
    name: "Notifications",
    icon: "notifications",
  },
  {
    name: "Settings",
    icon: "settings",
  },
];

export default function SideBar() {
  const [active, setActive] = useState(0);

  return (
    <aside className="">
      {/* <div className="flex items-center justify-between mt-5">
        <div className="flex gap-2">
          <img className="w-8 h-8" src={reactLogo} alt="Logo" />
          <h2>
            Test<span className="danger">Digmi</span>
          </h2>
        </div>

        <div className="pr-4 hidden sm:block">
          <span className="material-icons-sharp ease-in duration-300 text-base">
            close
          </span>
        </div>
      </div> */}

      <div className="flex flex-col hover:shadow-none cursor-pointer bg-color-white shadow-box-shadow rounded-xl h-[100vh] top-6 ease-in duration-300">
        {menuItems.map((menuItem) => {
          return (
            <a
              key={menuItem.name}
              className="flex items-center ms-4 text-color-info-dark h-[3.5rem] gap-4 relative ease-in duration-300 hover:text-color-primary sm:"
            >
              <span className="material-icons-sharp ease-in duration-300 text-2xl hover:ml-3">
                {menuItem.icon}
              </span>
              <div className="sm:inline md:hidden">{menuItem.name}</div>
            </a>
          );
        })}

        {/* Active class added */}
        {/* <a className="flex items-center justify-center text-color-info-dark h-[3.5rem] gap-4 relative ease-in duration-300 text-color-primary bg-color-light"> */}
      </div>
    </aside>
  );
}
