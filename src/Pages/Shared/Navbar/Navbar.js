import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const navItems = [
  { id: 2, to: "/about", displayText: "About" },
  { id: 3, to: "/appointment", displayText: "Appointment" },
  { id: 4, to: "/reviews", displayText: "Reviews" },
];
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const location = useLocation();
  const pathname = location.pathname;

  const navListItems = (
    <React.Fragment>
      {user && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      {navItems.map((navItem) => (
        <li key={navItem.id}>
          <Link to={navItem.to}>{navItem.displayText}</Link>
        </li>
      ))}
      {user ? (
        <li>
          <button className="btn btn-outline" onClick={logout}>
            Logout
          </button>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            htmlFor={pathname.includes("/dashboard") ? "dashboardDrawer" : ""}
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ${
              pathname.includes("/dashboard") ? "hidden" : ""
            }`}
          >
            {navListItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Doctors Portal
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navListItems}</ul>
      </div>
    </div>
  );
};

export default Navbar;
