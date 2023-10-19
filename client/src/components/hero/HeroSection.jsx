// imports
import React, { useState, useEffect, useRef, useContext } from 'react';

// react router dom
import { Link } from 'react-router-dom';

// import from utils
import { mainNavItems } from '../../utils/navItems';

import Auth from '../../utils/auth';

import { themeSelector } from '../../App';

// styling
import '../../styles/partials/_hero.scss';

function HeroSection() {
  // using state to see if nav is clicked
  const [clicked, setClicked] = useState(false);

  // function to set clicked to true if clicked
  const handleClick = () => {
    setClicked(!clicked);
  };

  // function to set clicked back to false to close the menu
  const closeMenu = () => {
    setClicked(!clicked);
  };

  // custom hook to close the mobile nav menu by clicking away from the menu
  const useClickOutside = () => {
    // creating a reference
    const domNode = useRef();

    useEffect(() => {
      const handler = (e) => {
        // if the user clicks away from the element then the modal will close
        if (!domNode.current?.contains(e.target)) closeMenu();
        document.addEventListener('mousedown', handler);
        return document.removeEventListener('mousedown', handler); // remove the return function because i believe this as is should still work
      };
      handler();
      return domNode;
    });
  };

  const domNode = useClickOutside();

  // getting the theme selector and the function to switch the theme from the app
  const { SwitchTheme } = useContext(themeSelector);
  // const { theme } = useContext(themeSelector);

  return (
    <header className='nav-header'>
      <nav ref={domNode} className='navbar-container'>
        {/* menu icon for the website */}
        <button className='menu-icon' type='button' onClick={handleClick}>
          <i className={clicked ? 'lni lni-cross-circle' : 'lni lni-menu'} />
        </button>
        <ul className={clicked ? 'nav-ul active' : 'nav-ul'}>
          {mainNavItems.map((item) => (
            // make sure li always has a key
            <button onClick={closeMenu} type='button'>
              <Link className={item.cName} to={item.url}>
                {item.text}
              </Link>
            </button>
          ))}
          {Auth.loggedIn() ? (
            <li>
              <Link onClick={Auth.logout} to='/' className='navbar-links'>
                {' '}
                Logout
              </Link>
            </li>
          ) : (
            <> </>
          )}
          {/* using placeholder button for now */}
          <button
            aria-label='switch theme button'
            type='button'
            className='theme-switch-btn'
            onClick={SwitchTheme}
          />
        </ul>
      </nav>
    </header>
  );
}

export default HeroSection;
