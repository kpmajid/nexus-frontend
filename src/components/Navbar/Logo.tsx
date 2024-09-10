import logo from "../../assets/icosahedron.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="left flex flex-row gap-1.5 items-center">
        <div className="w-8 h-8 flex items-center">
          <img src={logo} alt="" />
        </div>
        <div className="text-3xl font-bold">Nexus</div>
      </div>
    </Link>
  );
};
export default Logo;
