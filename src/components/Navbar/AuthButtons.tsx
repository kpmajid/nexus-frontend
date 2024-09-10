import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <>
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Register</Link>
      </Button>
    </>
  );
};
export default AuthButtons;
