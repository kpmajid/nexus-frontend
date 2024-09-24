import ProjectsTopBar from "@/components/Projects/ProjectsTopBar";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";

import { useEffect, useState } from "react";

import { fetchProjects } from "@/apis/projectApi";
import { setProjects } from "@/app/features/projects/projectsSlice";
import { useDispatch } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        console.log(response,"inload");
        if (response) {
          dispatch(setProjects(response.data.projects));
        }
      } catch (err) {
        console.log(err);
        setError(true);
        // setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 rounded-lg pb-4 shadow">
      <ProjectsTopBar />
      <ProjectsGrid />
    </div>
  );
};
export default Projects;
