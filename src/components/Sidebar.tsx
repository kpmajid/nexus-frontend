import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faComments,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const Side = () => {
  return (
    <div className="bg-gray-50 text-black h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faFolder} className="mr-2" />
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chats"
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Chat
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meet"
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faVideo} className="mr-2" />
              Meets
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Side;
