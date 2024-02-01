import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <ul className="nav flex-column border-0 pt-4 pl-4 pb-4 bg-slate-600">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/hotels">
            Hotels
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/subscription">
            Subscriptions
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/features">
            Features
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
