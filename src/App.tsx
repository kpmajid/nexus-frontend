import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col flex-1 bg-neutral-100">
      <Navbar />
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}
