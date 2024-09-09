import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col flex-1 bg-neutral-100">
      <Navbar />
      <ToastContainer />
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}
