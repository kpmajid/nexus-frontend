import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { useNavigate } from "react-router-dom";

import ProjectDetails from "@/components/Project/ProjectDetails";
import ProjectChangelog from "@/components/Project/ProjectChangelog";
import { useEffect } from "react";

const ProjectOverview = () => {
  const navigate = useNavigate();

  const { project } = useSelector((state: RootState) => state.projectDetails);

  useEffect(() => {
    if (!project) {
      navigate("/projects");
    }
  }, [project, navigate]);

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
