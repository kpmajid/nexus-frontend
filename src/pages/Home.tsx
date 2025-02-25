import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/projects");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col h-full">
      <main className="flex-grow container mx-auto px-4 py-8 overflow-y-auto">
        <section className="text-center mb-16 mt-16">
          <h2 className="text-4xl font-bold mb-4">Welcome to Nexus</h2>
          <p className="text-xl text-gray-600 mb-8">
            The all-in-one project management solution for developers
          </p>
          <Link to="/login">
            <Button size="lg" className="text-lg px-8">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </section>
      </main>

      <footer className=" text-black py-2">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Nexus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default Home;
