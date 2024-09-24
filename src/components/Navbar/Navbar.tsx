import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? <UserMenu /> : <AuthButtons />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
