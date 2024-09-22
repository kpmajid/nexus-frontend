import {Project} from '../../types/types'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600 text-sm">
          Created by {project.creator}
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
        {project.members.slice(0, 3).map((member, idx) => (
          <img
            key={idx}
            src={member.avatar}
            alt="member"
            className="w-8 h-8 rounded-full"
          />
        ))}
        <span className="text-gray-600">+{project.members.length - 3}</span>
      </div>
      <div className="text-gray-600 text-sm">
        <span>{project.progress}% progress</span>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      <div className="text-gray-500 text-xs">
        {project.startDate} - {project.endDate}
      </div>
    </div>
  );
};

export default ProjectCard;
