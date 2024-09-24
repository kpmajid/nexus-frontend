import { Outlet } from "react-router-dom";
import ProjectSidebar from "./ProjectSidebar";

const ProjectLayout = () => {
  return (
    <div className="grid-cols-[220px,_1fr] grid gap-4 ">
      <ProjectSidebar />
      <main className="flex-1 px-2 py-4">
        <Outlet />
      </main>
    </div>
  );
}
export default ProjectLayout

