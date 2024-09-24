import ProjectCard from "@/components/Projects/ProjectCard";

import { Project } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";

const ProjectsGrid = () => {
  const navigate = useNavigate();
  const projects: Project[] = useSelector(
    (state: RootState) => state.projects.projects
  );

  const handleProjectClick = (projectId: string) => {
    navigate(`/${projectId}`);
  };

  return (
    <>
      {projects.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => handleProjectClick(project._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-600">
          <p className="text-lg font-semibold">No Projects Available</p>
        </div>
      )}
    </>
  );
};

export default ProjectsGrid;
