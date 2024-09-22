import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="px-8 flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {isLoggedIn ? <UserMenu /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
