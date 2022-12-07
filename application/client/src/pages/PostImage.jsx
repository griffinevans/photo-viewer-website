import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { queryLogin } from '../api/protectors.js';
import { Forbidden } from './Forbidden.jsx';
import { toast } from 'react-toastify';
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

    if(formData.get("uploadImage").size > 10000000) {
      toast.error("File cannot be larger than 10mb");
      throw new Error("File size too big");
    }

    if(!formData.get("title")) {
      toast.error("Your post needs a title");
      throw new Error("No post title");
    }

    console.log(formData);
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
          toast.error('Error uploading post');
        }
      })
      .catch( (err) => {
        console.log(err);
        toast.error('Network error');
      });
  }

  if(isLoggedIn) {
    return(
      <div>
        <Navbar />
        <section className="postCard">
          <h1>Upload Image</h1>
          <form id="postimage" className="form-field" onSubmit={handleSubmit}>
            <label htmlFor="title"> Post title </label>
            <input type="text" id="title" name="title" required />
            <label> Post description </label>
            <input type="text" name="description" />
            <label htmlFor="image"> Choose a picture: </label>
            <input
              required
              type="file"
              id="uploadImage"
              name="uploadImage"
              accept="image/png, image/jpeg, image/webp"
              />
            <div className="checkbox">
              <input required type="checkbox" id="tos" name="tos" />
              <label htmlFor="tos">
                Acknowledge you have read and understood the&nbsp; 
                <a href="">Acceptable Use Policy</a>
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
