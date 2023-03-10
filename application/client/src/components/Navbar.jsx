import React, { useState, useEffect } from 'react';
import { queryLogin } from '../api/protectors.js';

export const Navbar = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    const runLoginQuery = async () => {
      setIsLoggedIn(await queryLogin());
    }

    runLoginQuery();
  },[]);

  let navbar;
  if(isLoggedIn) {
    navbar = <nav>
      <a href="/">Index</a>
      <a href="/postimage">Post Image</a>
      <a className="logout" href="/" onClick={e => logOut(e)}>Log out</a>
    </nav>
  } else {
    navbar = <nav>
      <a href="/">Index</a>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
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
  fetch('/api/users/logout', {
    method: 'POST',
  })
    .then( (response) => response.json())
    .then( (res_json) => {
      window.location.replace('/');
    })
    .catch( (err) => console.log(err));
}
