import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn,loadComponent ,  is_admin }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!is_admin ? (
          <p onClick={() => loadComponent('myJobs')} className='f3 link dim black underline pa3 pointer'>My Jobs</p>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p onClick={() => loadComponent('PostJobs')} className='f3 link dim black underline pa3 pointer'>Post Jobs</p>
            <p onClick={() => loadComponent('Users')} className='f3 link dim black underline pa3 pointer' style={{ marginLeft: '10px' }}>Users</p>
            <p onClick={() => loadComponent('Archive')} className='f3 link dim black underline pa3 pointer' style={{ marginLeft: '10px' }}>Archive</p>
          </div>
        )}
        <p onClick={() => loadComponent('JobListing')} className='f3 link dim black underline pa3 pointer' style={{ marginLeft: '10px' }}>JobListing</p>
        <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;
