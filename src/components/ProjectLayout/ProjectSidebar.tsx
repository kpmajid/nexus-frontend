import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Info, ListTodo, Layout, Database, Users } from "lucide-react";

import { fetchProjectDetails } from "@/apis/projectApi";

import {
  setProjectDetails,
  setUserRole,
} from "@/app/features/project/projectDetailsSlice";

import { RootState } from "@/app/store";

import ProjectSelect from "./ProjectSelect";
import LoadingSpinner from "../LoadingSpinner";

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
        const project = await fetchProjectDetails(id);

        if (project) {
          const role =
            project.teamLead._id === currentUser?.id
              ? "teamLead"
              : "teamMember";

          dispatch(setProjectDetails(project));
          dispatch(setUserRole(role));
        } else {
          console.log("sample?");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id, dispatch, currentUser]);

  if (!project) return <LoadingSpinner />;

  const navItems = [
    { to: `/${id}`, icon: Info, label: "Overview" },
    { to: `/${id}/tasks`, icon: ListTodo, label: "Task" },
    { to: `/${id}/board`, icon: Layout, label: "Board" },
    { to: `/${id}/database`, icon: Database, label: "Database" },
    { to: `/${id}/members`, icon: Users, label: "Members" },
  ];

  return (
    <aside className="bg-white shadow-sm h-[calc(100vh-4rem)] w-60 fixed left-0 top-16 p-4 hidden lg:block">
      <ProjectSelect project={project} />
      <nav className="mt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === `/${id}`}
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
export default ProjectSidebar;
