// imports
import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';

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
    setClick(!clicked);
  };

  // custom hook to close the mobile nav menu by clicking away from the menu
  const useClickOutside = () => {
    // creating a reference
    let domNode = useRef();

    useEffect(() => {
      let handler = (e) => {
        !domNode.current?.contains(e.target) ? closeMenu() : null; //if the click happens within the elements dimensions then nothing will happen else it will close the menu
        document.addEventListener('mousedown', handler);
        return document.removeEventListener('mousedown', handler); //remove the return function because i believe this as is should still work
      };
      return domNode;
    });
  };

  let domNode = useClickOutside();

  // getting the theme selector and the function to switch the theme from the app
  const { SwitchTheme } = useContext(themeSelector);
  // const { theme } = useContext(themeSelector);

  return (
    <>
      <header className='nav-header'>
        <nav ref={domNode} className='navbar-container'>
          {/* menu icon for the website */}
          <div className='menu-icon' onClick={handleClick}>
            <i
              className={clicked ? 'lni lni-cross-circle' : 'lni lni-menu'}
            ></i>
          </div>
          <ul className={clicked ? 'nav-ul active' : 'nav-ul'}>
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
                <Link onClick={Auth.logout} to='/' className='navbar-links'>
                  {' '}
                  Logout
                </Link>
              </li>
            ) : (
              <> </>
            )}
            {/* using placeholder button for now */}
            <button className='theme-switch-btn' onClick={SwitchTheme} />
          </ul>
        </nav>
      </header>
    </>
  );
}

export default HeroSection;
