import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { queryLogin } from '../api/protectors.js';
import { Forbidden } from './Forbidden.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PostImage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    const runLoginQuery = async () => {
      setIsLoggedIn(await queryLogin());
    }

    runLoginQuery();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("postimage"));

    fetch('/api/posts/create', {
      method: 'POST',
      redirect: 'follow',
      body: formData
    })
      .then( (response) => {
        if(response.ok) {
          toast.success("Image posted");
          document.getElementById("postimage").reset();
        } else {
          toast.error('Network error', {position: "top-center", theme: "colored", autoClose: 1000});
        }
      })
      .catch( (err) => console.log(err));
  }

  if(isLoggedIn) {
    return(
      <div>
        <Navbar />
        <section className="card">
          <h1>Upload Image</h1>
          <form id="postimage" className="form-field" onSubmit={handleSubmit}>
            <label htmlFor="title"> Post title </label>
            <input type="text" id="title" name="title" />
            <label> Post description </label>
            <input type="text" name="description" />
            <label htmlFor="image"> Choose a picture: </label>
            <input
              type="file"
              id="uploadImage"
              name="uploadImage"
              accept="image/png, image/jpeg, image/webp"
              />
            <div className="checkbox">
              <input type="checkbox" id="tos" name="tos" />
              <label htmlFor="tos">
                Acknowledge you have read and understood the 
                <a href=""> Acceptable Use Policy</a>
              </label>
            </div>
            <button>Upload</button>
          </form>
        </section>
      </div>
    );
  } else {
    return (
      <Forbidden />
    );
  }
}

