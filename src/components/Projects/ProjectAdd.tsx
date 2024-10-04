import { useState } from "react";

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createProject } from "@/apis/projectApi";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import DatePicker from "./DatePicker";
// import { AppDispatch } from "@/app/store";
// import { useDispatch } from "react-redux";

interface Errors {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const ProjectAdd = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [errors, setErrors] = useState<Errors>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleProjectAdd = async (
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
      const response = await createProject({
        title,
        description,
        startDate: new Date(startDate!),
        endDate: new Date(endDate!),
      });

      console.log(response?.data);
      // dispatch(addProject());

      toast.success("new project added!");
      navigate(`/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex text-sm items-center gap-2 hover:bg-stone-100 hover:text-violet-700 px-3 py-1.5 rounded"
        >
          <FontAwesomeIcon icon={faAdd} />
          <span>New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
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
          <Button type="button" onClick={handleProjectAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProjectAdd;
