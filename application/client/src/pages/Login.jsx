import React from 'react';
import Navbar from '../components/Navbar';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <main>
          <section className="spacey-quote">
            <h1>UN JOUR JE SERAI DE RETOUR PRES DE TOI</h1>
            <p>one day, i will return to your side</p>
          </section>
          <section className="card">
            <form id="login" className="form-field"
              method="POST"
              action="/users/login"
              encType="application/x-www-form-urlencoded">

              <label htmlFor="username"> Username: </label>
              <input type="text" id="username" name="username" />
              <label htmlFor="password"> Password: </label>
              <input type="password" id="password" name="password" />
              <button>Login</button>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default Login;
