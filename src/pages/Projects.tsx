import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ProjectsTopBar from "@/components/Projects/ProjectsTopBar";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";

import { fetchProjects } from "@/apis/projectApi";
import { setProjects } from "@/app/features/projects/projectsSlice";
import LoadingSpinner from "@/components/LoadingSpinner";

import { ApiError } from "@/apis/error";

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      const result = await fetchProjects();
      if (result.data) {
        dispatch(setProjects(result.data));
      } else if (result.error) {
        setError(result.error);
      }
      setLoading(false);
    };

    loadProjects();
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ProjectsTopBar />
      <ProjectsGrid />
    </div>
  );
};
export default Projects;
