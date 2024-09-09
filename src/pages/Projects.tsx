import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const project = {
    title: "Done planning of project",
    description:
      "Create overall UX process of full product including user personas...",
    creator: "Kendrick Lamar",
    status: "Completed",
    members: [
      { avatar: "avatar1.jpg" },
      { avatar: "avatar2.jpg" },
      { avatar: "avatar3.jpg" },
      { avatar: "avatar4.jpg" },
    ],
    progress: 75,
    startDate: "Aug 1",
    endDate: "Dec 31",
  };
  return (
    <div className="flex flex-wrap gap-6">
      <ProjectCard project={project} />
      <ProjectCard project={project} />
      <ProjectCard project={project} />
      <ProjectCard project={project} />
    </div>
  );
};
export default Projects;
