import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Logout extends React.Component {
  render() {
    return (
      <a className="logout" href="/" onClick={e => logOut(e)}>Log out</a>
    );
  }
}

async function logOut(e) {
  e.preventDefault();
  fetch('/users/logout', {
    method: 'POST',
  })
    .then( (response) => response.json())
    .then( (res_json) => {
      console.log(res_json);
      window.location.reload();
    })
    .catch( (err) => console.log(err));

  toast.error('Logged out', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export default Logout;

