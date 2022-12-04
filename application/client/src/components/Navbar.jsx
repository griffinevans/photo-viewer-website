import React, { useState, useEffect } from 'react';
import { queryLogin } from '../api/protectors.js';
import { ToastContainer, toast } from 'react-toastify';

export const Navbar = () => {

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
      <a className="logout" href="/" onClick={e => logOut(e)}>Log out</a>
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

async function logOut(e) {
  e.preventDefault();
  fetch('/users/logout', {
    method: 'POST',
  })
    .then( (response) => response.json())
    .then( (res_json) => {
      window.location.replace('/');
    })
    .then( () => toast.error("logged out"))
    .catch( (err) => console.log(err));
}
