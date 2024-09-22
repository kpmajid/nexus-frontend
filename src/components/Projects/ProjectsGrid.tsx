import ProjectCard from "@/components/Projects/ProjectCard";

import { Project } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ProjectsGrid = () => {
  const projects: Project[] = useSelector(
    (state: RootState) => state.projects.projects
  );

  return (
    <>
      {projects.length ? (
        projects.map((project) => {
          <ProjectCard key={project._id} project={project} />;
        })
      ) : (
        <div className="px-4">No Projects!</div>
      )}
    </>
  );
};

export default ProjectsGrid;
