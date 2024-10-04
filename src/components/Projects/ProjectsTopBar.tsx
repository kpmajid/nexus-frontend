// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectAdd from "./ProjectAdd";

const ProjectsTopBar = () => {
  return (
    <div className="bg-white rounded-t-lg border-b px-4 mb-4 p-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block"></span>
          <span className="text-xs block text-stone-500"></span>
        </div>
        <ProjectAdd />
      </div>
    </div>
  );
};
export default ProjectsTopBar;
