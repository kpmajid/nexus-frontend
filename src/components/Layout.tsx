import { Outlet } from "react-router-dom";
import Side from "./Sidebar";

const Layout = () => {
  return (
    <div className="grid-cols-[220px,_1fr] grid gap-4 ">
      <Side />
      <main className="flex-1 px-2 py-4">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
