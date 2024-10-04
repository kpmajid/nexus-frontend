import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

import { deleteProject } from "@/apis/projectApi";
import { useNavigate } from "react-router-dom";

const ProjectDelete = () => {
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { project } = useSelector((state: RootState) => state.projectDetails);

  const handleDelete = async () => {
    // Implement delete functionality
    try {
      await deleteProject(project?._id);
      setIsDeleteDialogOpen(false);
      toast.success("Project deleted successfully!");

      navigate(`/projects`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project. Please try again.");
    }
  };

  if (!project) return null;

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="flex items-center">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project: {project.title}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the project "{project.title}"? This
            action cannot be undone. All associated tasks, comments, and data
            will be permanently removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ProjectDelete;
