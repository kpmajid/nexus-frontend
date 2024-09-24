import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";

import DatePicker from "../Projects/DatePicker";
import { editProject } from "@/apis/projectApi";

interface Errors {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const ProjectEdit = () => {
  const { project } = useSelector((state: RootState) => state.projectDetails);

  // const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>(project?.title || "");
  const [description, setDescription] = useState<string>(
    project?.description || ""
  );

  const [startDate, setStartDate] = useState<Date | null>(
    project?.startDate ? new Date(project.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    project?.endDate ? new Date(project.endDate) : null
  );

  const [errors, setErrors] = useState<Errors>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleProjectSave = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    setErrors({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    });

    let hasErrors = false;

    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      hasErrors = true;
    }

    if (!description.trim()) {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
      hasErrors = true;
    }

    if (!startDate) {
      setErrors((prev) => ({ ...prev, startDate: "Start date is required" }));
      hasErrors = true;
    }

    if (!endDate) {
      setErrors((prev) => ({ ...prev, endDate: "End date is required" }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      if (!project) {
        return;
      }
      
      const response = await editProject({
        projectId: project._id,
        title,
        description,
        startDate: new Date(startDate!),
        endDate: new Date(endDate!),
      });

      if (response.data) {
        // dispatch(updateProject(response.data));
        toast.success("Project updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Name</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-sm text text-red-500 ">{errors.title}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-sm text-red-500 ">{errors.description}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <DatePicker
              label="Start Date"
              date={startDate}
              setDate={setStartDate}
              error={errors.startDate}
            />
            <DatePicker
              label="End Date"
              date={endDate}
              setDate={setEndDate}
              error={errors.endDate}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleProjectSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProjectEdit;
