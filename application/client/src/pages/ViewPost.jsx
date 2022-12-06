import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { queryLogin } from '../api/protectors.js';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export const ViewPost = (props) => {

  const { postId } = useParams();
  const [auth, setAuth] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    username: "",
    createdAt: "",
    thumbnail: ""
  });

  //on page load, check if user is logged in
  useEffect( () => {
    const runLoginQuery = async () => {
      setAuth(await queryLogin());
    }
    runLoginQuery();
  },[]);

  //load post if authenticated (runs whenever auth is updated)
  useEffect( () => {
    if(auth) {
      fetch(`/api/posts/${postId}`)
        .then( response => response.json() )
        .then( res_json => setPost(res_json) )
        .catch( err => console.log(err) );
    }
  },[auth]);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <section className="viewPostCard">
          <div className="viewPostText">
            <h2 className="title">{post["title"]}</h2>
            <p className="author">{post["username"]}</p>
            <p className="date">{post["createdAt"].slice(0,10)}</p>
            <p className="description">{post["description"]}</p>
          </div>
          <img src={post["image"]} />
        </section>
      </main>
    </div>
  );
}

