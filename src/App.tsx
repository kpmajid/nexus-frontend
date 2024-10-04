import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const [loading, setLoading] = useState(true);

  useRefreshToken();

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      setLoading(false);
      if (isLoggedIn) {
        navigate("/projects");
      }
    }
  }, [isLoggedIn, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      <Navbar />
      <ToastContainer />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
