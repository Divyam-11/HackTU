/* basic header component */
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
function Header() {
  return (
    <div className="">
      <nav>
        <ul className="flex justify-evenly space-x-4 p-5">
          <li>
            <img src={Logo} alt="Logo" border="0" className="h-15" />
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
