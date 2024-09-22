import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/apis/authApi";

import { AppDispatch, RootState } from "@/app/store";
import { logoutFulfilled } from "@/app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDropdown = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    throw new Error("User is not logged in");
  }
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutFulfilled());
    navigate("/");
    toast.success("Logged out successfully", { position: "top-center" });
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
  };
  const handleProjectsNavigation = () => {
    navigate("/projects");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 px-2">
          <Avatar className="h-[25px] w-[25px] ">
            <AvatarImage
              src={user.avatar}
              className="w-full h-full object-cover"
            />
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfileNavigation}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleProjectsNavigation}>
            Projects
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
