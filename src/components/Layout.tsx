import { Outlet } from "react-router-dom";
import Side from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Side />
      <main className="flex-1 ml-0 lg:ml-60 p-6">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
