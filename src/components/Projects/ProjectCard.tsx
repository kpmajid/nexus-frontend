import { Project, User } from "../../types/types";

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({
  project,
  onClick,
}) => {
  const teamLead: User = project.teamLead;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md w-80 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4 text-sm">{project.description}</p>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600 text-sm">
          Created by {teamLead?.name}
        </span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            project.status === "Completed" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        {project.teamMembers.length > 0 ? (
          <>
            {project.teamMembers.slice(0, 3).map((member, idx) => (
              <img
                key={idx}
                src={member.avatar}
                alt="member"
                className="w-8 h-8 rounded-full"
              />
            ))}
            {project.teamMembers.length > 3 && (
              <span className="text-gray-600">
                +{project.teamMembers.length - 3}
              </span>
            )}
          </>
        ) : (
          <span className="text-gray-500 text-sm">No team members</span>
        )}
      </div>
      <div className="text-gray-500 text-xs">
        {formatDate(project.startDate)} - {formatDate(project.endDate)}
      </div>
    </div>
  );
};

export default ProjectCard;
