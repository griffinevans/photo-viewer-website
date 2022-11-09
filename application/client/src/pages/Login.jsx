import React from 'react';
import Navbar from '../components/Navbar';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
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
      </div>
    );
  }
}

export default Login;
