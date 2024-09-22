import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import useRefreshToken from "./useRefreshToken";

const useAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useRefreshToken();
  return isLoggedIn;
};

export default useAuth;
