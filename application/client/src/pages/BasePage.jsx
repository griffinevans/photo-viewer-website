//landing page to contain high-level state
import React, { useState, useEffect, useContext } from 'react';
import { queryLogin } from '../api/protectors.js';
import '../styles/style.css';
import PageRouter from '../PageRouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginContext from "../components/login-context";
import LoginContextSwitcher from "../components/LoginContextSwitcher";

function BasePage() {

  useEffect( () => {
    const status = async () => {
      //loggedIn = user has active session token
      //loginContext = front-end display
      let loggedIn = await queryLogin();
      if(loggedIn) {
        logoutToast();
      } else {
        loginToast();
      }
    }
    status();
  })

  return (
    <div>
      <LoginContextSwitcher />
      <ToastContainer />
      <PageRouter />
    </div>
  );
}

function logoutToast() {
  toast.err('logged out');
}
function loginToast() {
  teast.success('logged in');
}

export default BasePage;
