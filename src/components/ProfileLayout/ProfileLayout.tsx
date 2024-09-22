import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-[220px,_1fr] gap-4 ">
      <ProfileSidebar />
      <main className="flex-1 px-2 py-4">
        <Outlet />
      </main>
    </div>
  );
};
export default ProfileLayout;
