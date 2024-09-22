import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for isLoggedIn to be determined
    if (isLoggedIn !== undefined) {
      setLoading(false);
      if (isLoggedIn) {
        navigate("/projects");
      }
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return <div>Home</div>;
};
export default Home;
