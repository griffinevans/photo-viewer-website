import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { queryLogin } from '../api/protectors.js';
import { Forbidden } from './Forbidden.jsx';

export const ViewPost = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    const status = async () => {
      setIsLoggedIn(await queryLogin());
    }

    status();
  });
  if(isLoggedIn) {
    return (
      <div>
        <Navbar />
        <main>
          <section className="card">
            <h2>Justice</h2>
            <p>+1 The lieutenant trusts you.<br />+2 Kim *truly* trusts you.</p>
            <p>March 4th, '51</p>
            <img src="../images/Portrait_kitsuragi.png" />
          </section>
        </main>
      </div>
    );
  } else {
    return (
      <Forbidden />
    );
  }
}

