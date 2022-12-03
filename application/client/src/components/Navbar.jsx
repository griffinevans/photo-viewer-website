import React, { useState, useEffect } from 'react';
import Logout from '../components/Logout.jsx';
import { queryLogin } from '../api/protectors.js';

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    const status = async () => {
      setIsLoggedIn(await queryLogin());
    }

    status();
  });

  let navbar;
  if(isLoggedIn) {
    navbar = <nav>
      <a href="/">Index</a>
      <a href="postimage">Post Image</a>
      <a href="viewpost">View Post</a>
      <Logout />
    </nav>
  } else {
    navbar = <nav>
      <a href="/">Index</a>
      <a href="login">Login</a>
      <a href="register">Register</a>
    </nav>
  }

  return (
    <div>
      {navbar}
    </div>
  );
}

export default Navbar;
