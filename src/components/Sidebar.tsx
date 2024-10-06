import { NavLink } from "react-router-dom";

import { Folder, MessageSquare, Video } from "lucide-react";

const Side = () => {
  const navItems = [
    { to: "/projects", icon: Folder, label: "Projects" },
    { to: "/chats", icon: MessageSquare, label: "Chat" },
    { to: "/meet", icon: Video, label: "Meets" },
  ];

  return (
    <aside className="bg-white shadow-sm h-[calc(100vh-4rem)] w-60 fixed left-0 top-16 p-4 hidden lg:block">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Side;
