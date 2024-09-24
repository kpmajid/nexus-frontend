import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";

import { Project } from "@/types/types";

interface ProjectSelectProps {
  project: Project;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({ project }) => {
  const navigate = useNavigate();
  const handleValueChange = (value: string) => {
    navigate(value);
  };
  return (
    <Select onValueChange={handleValueChange} defaultValue={project.title}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={project.title}>{project.title}</SelectItem>
        </SelectGroup>
        <DropdownMenuSeparator />
        <SelectGroup>
          <SelectItem value="/projects">Projects</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default ProjectSelect;
