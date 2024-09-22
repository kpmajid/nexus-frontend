import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import useRefreshToken from "./hooks/useRefreshToken";

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
