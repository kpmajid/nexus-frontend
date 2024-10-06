import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

import useSessionPersistence from "./hooks/useSessionPersistence";
import LoadingSpinner from "./components/LoadingSpinner";
import { RootState } from "./app/store";

export default function App() {
  useSessionPersistence();
  const authState = useSelector((state: RootState) => state.auth);

  if (authState.isLoggedIn === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
