import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useRefreshToken from "@/hooks/useRefreshToken";

const RequireAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();

  useRefreshToken();

  if (isLoggedIn === undefined) {
    return null; // or a loading spinner
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
