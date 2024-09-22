// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectAdd from "./ProjectAdd";

const ProjectsTopBar = () => {
  return (
    <div className="bg-white rounded-t-lg border-b px-4 mb-4 p-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Good morning, Tom!</span>
          <span className="text-xs block text-stone-500">
            Tuesday, Aug 8th 2023
          </span>
        </div>

        <ProjectAdd/>
        {/* <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FontAwesomeIcon icon={faCalendar} />
          <span>Prev 6 Months</span>
        </button> */}
      </div>
    </div>
  );
};
export default ProjectsTopBar;
