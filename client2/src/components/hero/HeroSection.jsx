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
  return <header className='header'></header>;
}

export default HeroSection;
