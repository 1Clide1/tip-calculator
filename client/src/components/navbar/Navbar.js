// import section
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mainNavItems } from "./navItems";
import Auth from "../../utils/auth";
import "./navbar.css";

const Navbar = () => {
  // setting the state of the mobile navbar menu
  const [clicked, setClick] = useState(false);
  const handleClick = () => {
    setClick(!clicked);
  };
  const closeMenu = (e) => {
    console.log(e.target);
  };
  return (
    <>
      <nav className="navbar-container">
        {/* menu icon for the website */}
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicked ? "lni lni-cross-circle" : "lni lni-menu"}></i>
        </div>
        <ul className={clicked ? "nav-ul active" : "nav-ul"}>
          {mainNavItems.map((item, index) => {
            return (
              // make sure li always has a key
              <li key={index} onClick={closeMenu}>
                <Link className={item.cName} to={item.url}>
                  {item.text}
                </Link>
              </li>
            );
          })}
          {Auth.loggedIn() ? (
            <li>
              <Link onClick={Auth.logout} to="/" className="navbar-links">
                {" "}
                Logout
              </Link>
            </li>
          ) : (
            <> </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
