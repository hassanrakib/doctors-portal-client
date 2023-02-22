import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { id: 1, to: "/", displayText: "Home" },
  { id: 2, to: "/about", displayText: "About" },
  { id: 3, to: "/appointment", displayText: "Appointment" },
  { id: 4, to: "/reviews", displayText: "Reviews" },
  { id: 5, to: "/contact", displayText: "Contact Us" },
  { id: 6, to: "/login", displayText: "Login" },
];
const Navbar = () => {
  const navListItems = (
    <React.Fragment>
      {navItems.map((navItem) => (
        <li key={navItem.id}>
          <Link to={navItem.to}>{navItem.displayText}</Link>
        </li>
      ))}
    </React.Fragment>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
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
