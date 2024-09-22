import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { createProject } from "@/apis/projectApi";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";

const ProjectAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleProjectAdd = async (e) => {
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
      const formatedStartDate = new Date(startDate);
      const formatedEndDate = new Date(endDate);
      console.log(title, description, startDate, endDate);
      const response = await createProject({
        title,
        description,
        startDate: formatedStartDate,
        endDate: formatedEndDate,
      });
      console.log(response.data);
      // dispatch(addProject());

      toast.success("new project added!");
      navigate("/projects");
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
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title">Name</Label>
            <Input
              id="title"
              placeholder="enter project title"
              value={title}
              onChange={handleTitleChange}
            />
            {errors.title && (
              <p className="text-sm text-muted-foreground text-red-500 ">
                {errors.title}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter Description."
              value={description}
              onChange={handleDescriptionChange}
            />
            {errors.description && (
              <p className="text-sm text-muted-foreground text-red-500 ">
                {errors.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="invite">Invite</Label>
            <Input id="invite" placeholder="Enter email id" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              {errors.startDate && (
                <p className="text-sm text-muted-foreground text-red-500 ">
                  {errors.startDate}
                </p>
              )}

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="start-date">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "PPP")
                  ) : (
                    <span>Pick end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              {errors.endDate && (
                <p className="text-sm text-muted-foreground text-red-500 ">
                  {errors.endDate}
                </p>
              )}
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
