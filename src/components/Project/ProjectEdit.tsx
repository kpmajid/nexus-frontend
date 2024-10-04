import { useState, useEffect } from "react";
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

import { AxiosResponse } from "axios";

interface Errors {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const ProjectEdit = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { project } = useSelector((state: RootState) => state.projectDetails);

  // const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [errors, setErrors] = useState<Errors>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (isEditDialogOpen && project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setStartDate(project.startDate ? new Date(project.startDate) : undefined);
      setEndDate(project.endDate ? new Date(project.endDate) : undefined);
    }
  }, [isEditDialogOpen, project]);

  const handleProjectSave = async (e: React.MouseEvent) => {
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
      if (!project || !startDate || !endDate) {
        return;
      }

      const response: AxiosResponse | void = await editProject({
        projectId: project._id,
        title,
        description,
        startDate,
        endDate,
      });

      if (response && "data" in response) {
        // dispatch(updateProject(response.data));
        toast.success("Project updated successfully!");
        setIsEditDialogOpen(false);
        
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Project: {project?.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Project Name</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-sm text-destructive ">{errors.title}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-y"
            />
            {errors.description && (
              <p className="text-sm text-destructive ">{errors.description}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <DatePicker
              label="Start Date"
              date={startDate}
              setDate={(date) => setStartDate(date)}
              error={errors.startDate}
            />
            <DatePicker
              label="End Date"
              date={endDate}
              setDate={(date) => setEndDate(date)}
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
