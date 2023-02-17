// imports
import React, { useState, useEffect, useRef, useContext } from 'react';
// react router dom
import { Link } from 'react-router-dom';
// import from utils
import { mainNavItems } from '../../utils/navItems';
import auth from '../../utils/auth';
import { themeSelector } from '../../../../client/src/App';

function HeroSection() {
  // using state to see if nav is clicked
  const [clicked, setClicked] = useState(false);

  // function to set clicked to true if clicked
  const handleClick = () => {
    setClicked(!clicked);
  };

  // function to set clicked back to false to close the menu
  const closeMenu = () => {
    setClick(!clicked);
  };

  // custom hook to close the mobile nav menu by clicking away from the menu
  const useClickOutside = () => {
    // creating a reference
    let domNode = useRef();

    useEffect(() => {
      let handler = (e) => {
        !domNode.current?.contains(e.target) ? closeMenu() : null; //if the click happens within the elements dimensions then nothing will happen else it will close the menu
      };
      document.addEventListener('mousedown', handler);
      return document.removeEventListener('mousedown', handler); //remove the return function because i believe this as is should still work
    });
  };
  return <header className='header'></header>;
}

export default HeroSection;
