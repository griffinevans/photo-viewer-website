import React from 'react';
import { Navbar } from '../components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(document.getElementById("login")));

    fetch('/api/users/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      redirect: 'follow',
      body: data
    })
    .then( (response) => {
        if(response.ok) {
          window.location.replace('/');
        } else {
          console.log(response);
          if(response.status === 401) {
            toast.error('Invalid credentials');
          }
          else {
            toast.error('Error connecting to server');
          }
          toast.clearWaitingQueue();
          document.getElementById("login").reset();
        }
      })
    .catch( (err) => console.log(err));
  }

  return (
    <div>
      <Navbar />
      <main>
        <section className="spacey-quote">
          <h1>UN JOUR JE SERAI DE RETOUR PRES DE TOI</h1>
          <p>one day, i will return to your side</p>
        </section>
        <section className="card">
          <form id="login" className="form-field" onSubmit={handleSubmit}>
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
