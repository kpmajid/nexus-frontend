import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="flex">
      <ProfileSidebar />
      <main className="flex-1 ml-0 lg:ml-60 p-6">
        <Outlet />
      </main>
    </div>
  );
};
export default ProfileLayout;
