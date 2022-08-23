// import section
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { mainNavItems } from "./navItems";
import Auth from "../../utils/auth";
import { themeSelector } from "../../App";
import "./navbar.css";

const Navbar = () => {
  // setting the state of the mobile navbar menu
  const [clicked, setClick] = useState(false);
  const handleClick = () => {
    setClick(!clicked);
  };
  // if you click a element in the nav then the menu would close after
  const closeMenu = () => {
    setClick(!clicked);
  };
  // custom hook to close mobile menu
  const useClickOutside = () => {
    // creating a refrence
    let domNode = useRef();
    useEffect(() => {
      let handler = (e) => {
        if (!domNode.current?.contains(e.target)) {
          setClick(false);
        } else {
          return null;
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    });
    return domNode;
  };

  let domNode = useClickOutside(() => {
    closeMenu();
  });

  // getting switch theme from the theme selector context that I have created
  const { SwitchTheme } = useContext(themeSelector);

  return (
    <>
      <nav ref={domNode} className="navbar-container">
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
          <button className="percent-btn" onClick={SwitchTheme}>
            Switch Theme
          </button>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
