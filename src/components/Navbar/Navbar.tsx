import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <Logo />
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? <UserMenu /> : <AuthButtons />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
