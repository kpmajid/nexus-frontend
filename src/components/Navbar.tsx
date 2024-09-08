import { Link } from "react-router-dom";

import logo from "../assets/icosahedron.png";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="px-8 flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to={"/"}>
            <div className="left flex flex-row gap-1.5 items-center">
              <div className="w-8 h-8 flex items-center">
                <img src={logo} alt="" />
              </div>
              <div className="text-3xl font-bold">Nexus</div>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
