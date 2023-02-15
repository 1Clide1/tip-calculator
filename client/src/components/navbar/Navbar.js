// import section
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { mainNavItems } from './navItems';
import Auth from '../../../../client2/src/utils/auth';
import { themeSelector } from '../../App';
// importing the material ui switch and the styled component to properly style the toggle switch
import { Switch, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import './navbar.css';

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
      document.addEventListener('mousedown', handler);
      return () => {
        document.removeEventListener('mousedown', handler);
      };
    });
    return domNode;
  };

  let domNode = useClickOutside(() => {
    closeMenu();
  });

  // getting switch theme from the theme selector context that I have created

  const { SwitchTheme } = useContext(themeSelector);
  const { theme } = useContext(themeSelector);

  // customized style switch code
  const ThemeToggleSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-switchBase': {
      color: '#d472bf',
      transitionDuration: '300ms',
      '&.Mui-checked': {
        color: '#f005be',
        transform: 'translateX(16px)',
      },
      '&:hover': {
        backgroundColor: alpha('#e9a6a6', theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: 22 / 1.5,
      backgroundColor: '#ffe6e6',
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      opacity: 1,
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 16,
      height: 16,
      margin: 2,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
  }));

  return (
    <>
      <nav ref={domNode} className='navbar-container'>
        {/* menu icon for the website */}
        <div className='menu-icon' onClick={handleClick}>
          <i className={clicked ? 'lni lni-cross-circle' : 'lni lni-menu'}></i>
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
          <ThemeToggleSwitch
            className='theme-switch-btn'
            // current bug happening with either the checked or the onchange properties that do not keep the animation even though
            onChange={SwitchTheme}
            // if the saved color theme is on the dark mode if I refresh the page stay checked if not then don't do that using
            checked={theme === 'dark' && true}
            color='secondary'
            inputProps={{ 'aria-label': 'color theme switch' }}
          />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
