import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import {
  faTasks,
  faDatabase,
  faChartBar,
  faUserCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { fetchProjectDetails } from "@/apis/projectApi";

import {
  setProjectDetails,
  setUserRole,
} from "@/app/features/project/projectDetailsSlice";

import { RootState } from "@/app/store";

import ProjectSelect from "./ProjectSelect";

const ProjectSidebar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { project } = useSelector((state: RootState) => state.projectDetails);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) {
          return;
        }
        const response = await fetchProjectDetails(id);

        if (response && response.data) {
          const projectDetails = response.data.projectDetails;

          const role =
            projectDetails.teamLead._id === currentUser?.id
              ? "teamLead"
              : "teamMember";

          dispatch(setProjectDetails(projectDetails));
          dispatch(setUserRole(role));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id, dispatch, currentUser]);

  if (!project) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="bg-gray-50 text-black h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <ProjectSelect project={project} />
          </li>
          <li>
            <NavLink
              to={`/${id}`}
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${id}/tasks`}
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faTasks} className="mr-2" />
              Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${id}/board`}
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faChartBar} className="rotate-90 mr-2" />
              Board
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${id}/database`}
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faDatabase} className="mr-2" />
              Database
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${id}/members`}
              className={({ isActive }) =>
                `block rounded p-2 ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
              Members
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default ProjectSidebar;
