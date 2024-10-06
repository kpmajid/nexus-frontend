import { Outlet } from "react-router-dom";
import ProjectSidebar from "./ProjectSidebar";

const ProjectLayout = () => {
  return (
    <div className="flex">
      <ProjectSidebar />
      <main className="flex-1 ml-0 lg:ml-60 p-6">
        <Outlet />
      </main>
    </div>
  );
};
export default ProjectLayout;
