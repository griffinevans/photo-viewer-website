import React from 'react';
import Navbar from '../components/Navbar';

class Registration extends React.Component {
  render() {
    return (
      <body>
      <Navbar />
    
        <main>
          <section class="card">
            <h1 class="title">Register</h1>
            <form id="register" class="form-field">
              <label for="username"> Username: </label>
              <input type="text" id="username" name="username" />
              <label for="email"> Email Address: </label>
              <input type="email" id="email" name="email" />
              <label for="password"> Password: </label>
              <input type="password" id="password" name="password" />
              <label for="confirmPassword"> Confirm Password: </label>
              <input type="password" id="confirmPassword" name="confirmPassword" />
              <div class="checkbox">
                <input type="checkbox" id="confirmAge" name="confirmAge" required="required" />
                <label for="confirmAge"> I am 13+ years old </label>
              </div>
              <div class="checkbox">
                <input type="checkbox" id="tos" name="tos" required />
                <label for="tos">
                  I accept the <a href="">TOS</a> and <a href="">Privacy Policy</a>
                </label>
              </div>
              <input type="submit" id="submit" />
            </form>
          </section>
        </main>
      </body>
    );
  }
}

export default Registration;
