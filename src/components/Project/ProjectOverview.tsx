import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { useNavigate } from "react-router-dom";

import ProjectDetails from "@/components/Project/ProjectDetails";
import ProjectChangelog from "@/components/Project/ProjectChangelog";

const ProjectOverview = () => {
  const navigate = useNavigate();

  const { project } = useSelector((state: RootState) => state.projectDetails);

  if (!project) {
    navigate("/projects");
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 lg:space-y-0 lg:flex lg:gap-6">
      <div className="lg:w-3/4">
        <ProjectDetails />
      </div>
      <div className="lg:w-1/4">
        <ProjectChangelog />
      </div>
    </div>
  );
};

export default ProjectOverview;
