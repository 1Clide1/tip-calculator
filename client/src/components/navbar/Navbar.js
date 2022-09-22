// import section
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { mainNavItems } from "./navItems";
import Auth from "../../utils/auth";
import { themeSelector } from "../../App";
// importing the material ui switch and the styled component to properly style the toggle switch
import { Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/material/styles";
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

  // material ui theme toggle switch customization
  // **coming back to this because i do not fully understand how to properly override the switch**

  // const ThemeToggleSwitch = styled((props: SwitchProps) => (
  //   <Switch
  //     focusVisibleClassName=".Mui-focusVisible"
  //     disableRipple
  //     {...props}
  //   />
  // ))(({ theme }) => ({
  //   width: 42,
  //   height: 26,
  //   padding: 0,
  //   "& .MuiSwitch-switchBase": {
  //     padding: 0,
  //     margin: 2,
  //     transitionDuration: "300ms",
  //     "&.Mui-checked": {
  //       transform: "translateX(16px)",
  //       color: "#fff",
  //       "& + .MuiSwitch-track": {
  //         backgroundColor:
  //           theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
  //         opacity: 1,
  //         border: 0,
  //       },
  //       "&.Mui-disabled + .MuiSwitch-track": {
  //         opacity: 0.5,
  //       },
  //     },
  //     "&.Mui-focusVisible .MuiSwitch-thumb": {
  //       color: "#33cf4d",
  //       border: "6px solid #fff",
  //     },
  //     "&.Mui-disabled .MuiSwitch-thumb": {
  //       color:
  //         theme.palette.mode === "light"
  //           ? theme.palette.grey[100]
  //           : theme.palette.grey[600],
  //     },
  //     "&.Mui-disabled + .MuiSwitch-track": {
  //       opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     boxSizing: "border-box",
  //     width: 22,
  //     height: 22,
  //   },
  //   "& .MuiSwitch-track": {
  //     borderRadius: 26 / 2,
  //     backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
  //     opacity: 1,
  //     transition: theme.transitions.create(["background-color"], {
  //       duration: 500,
  //     }),
  //   },
  // }));

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
          <Switch
            className="theme-switch-btn"
            onClick={SwitchTheme}
            color="secondary"
            inputProps={{ "aria-label": "color theme switch" }}
          />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
