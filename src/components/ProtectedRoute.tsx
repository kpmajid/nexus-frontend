import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
