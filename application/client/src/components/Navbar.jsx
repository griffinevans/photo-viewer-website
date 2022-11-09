import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <a href="index">Index</a>
        <a href="login">Login</a>
        <a href="registration">Registration</a>
        <a href="postimage">Post Image</a>
        <a href="viewpost">View Post</a>
      </nav>
    );
  }
}

export default Navbar;
