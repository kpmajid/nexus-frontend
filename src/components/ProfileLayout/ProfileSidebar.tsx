import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const ProfileSidebar = () => {
  return (
    <div className="bg-gray-50 text-black h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              General
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/change-password"
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Change Password
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default ProfileSidebar;
