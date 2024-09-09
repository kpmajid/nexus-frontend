import { Outlet } from "react-router-dom";
import Side from "./Side";

const Layout = () => {
  return (
    <div className="flex">
      <Side />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
