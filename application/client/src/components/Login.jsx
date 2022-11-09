import React from 'react';

class Login extends React.Component {
  render() {
    return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="../css/style.css" />
        <title>Log In</title>
      </head>
    
      <body>
        <nav>
          <a href="index.html">Index</a>
          <a href="login.html">Login</a>
          <a href="registration.html">Registration</a>
          <a href="postimage.html">Post Image</a>
          <a href="viewpost.html">View Post</a>
        </nav>
        <main>
          <section class="spacey-quote">
            <h1>UN JOUR JE SERAI DE RETOUR PRES DE TOI</h1>
            <p>one day, i will return to your side</p>
          </section>
          <section class="card">
            <form class="form-field" method="get">
              <label for="username"> Username: </label>
              <input type="text" id="username" name="username" />
              <label for="password"> Password: </label>
              <input type="password" id="password" name="password" />
              <button>Login</button>
            </form>
          </section>
        </main>
      </body>
    </html>
    );
  }
}

export default Login;
