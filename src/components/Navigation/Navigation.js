 

import React, { useState, useEffect } from 'react';
import './navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn, loadComponent, is_admin }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }

  const handleLinkClick = (route) => {
    setShowMenu(false);
    loadComponent(route);
  }

  if (isSignedIn) {
    if (isSmallScreen) {
      return (
        <nav className='navigation' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo className='logo' />
          <div className="dropdown">
            <button onClick={handleMenuClick} className="dropbtn">&#9776;</button>
            {showMenu && (
              <div className="dropdown-content">
                {!is_admin ? (
                  <p onClick={() => handleLinkClick('myJobs')} className='f3 link dim black underline pa3 pointer'>My Jobs</p>
                ) : (
                  <>
                    <p onClick={() => handleLinkClick('PostJobs')} className='f3 link dim black underline pa3 pointer'>Post Jobs</p>
                    <p onClick={() => handleLinkClick('Users')} className='f3 link dim black underline pa3 pointer'>Users</p>
                    <p onClick={() => handleLinkClick('Archive')} className='f3 link dim black underline pa3 pointer'>Archive</p>
                  </>
                )}
                <p onClick={() => handleLinkClick('JobListing')} className='f3 link dim black underline pa3 pointer'>JobListing</p>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
              </div>
            )}
          </div>
        </nav>
      );
    } else {
      return (
        <nav className='navigation' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo className='logo' />
          <div className="navbar-menu">
            {!is_admin ? (
              <>
                <a onClick={() => handleLinkClick('myJobs')}>My Jobs</a>
              </>
            ) : (
              <>
                <a onClick={() => handleLinkClick('PostJobs')}>Post Jobs</a>
                <a onClick={() => handleLinkClick('Users')}>Users</a>
                <a onClick={() => handleLinkClick('Archive')}>Archive</a>
              </>
            )}
            <a onClick={() => handleLinkClick('JobListing')}>Job Listing</a>
            <a onClick={() => onRouteChange('signout')}>Sign Out</a>
          </div>
        </nav>
      );
    }
  } else {
    if (isSmallScreen) {
      return (
        <nav className='navigation' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo className='logo' />
          <div className="dropdown">
            <button onClick={handleMenuClick} className="dropbtn">&#9776;</button>
            {showMenu && (



              <div className="dropdown-content">
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
              </div>
            )}
          </div>
        </nav>
      );
    } else {
      return (
        <nav className='navigation' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo className='logo' />
          <div className="navbar-menu">
            <a onClick={() => onRouteChange('signin')}>Sign In</a>
            <a onClick={() => onRouteChange('register')}>Register</a>
          </div>
        </nav>
      );
    }
  }
};
 


export default Navigation