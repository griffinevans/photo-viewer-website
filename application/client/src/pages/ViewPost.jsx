import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { queryLogin } from '../api/protectors.js';
import { Forbidden } from './Forbidden.jsx';
import { useParams } from 'react-router-dom';

export const ViewPost = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [post, setPost] = useState([]);

  const { postId } = useParams();

  useEffect( () => {
    const runLoginQuery = async () => {
      setIsLoggedIn(await queryLogin());
    }
    runLoginQuery();

    fetch(`/posts/${postId}`)
      .then( response => response.json() )
      .then( res_json => setPost(res_json) )
      .catch( err => console.log(err) );
  },[]);

  if(isLoggedIn) {
    return (
      <div>
        <Navbar />
        <main>
          <section className="card">
              <h2>{post["title"]}</h2>
              <p>{post["description"]}</p>
              <p className="author">{post["username"]}</p>
              <p>{post["createdAt"].slice(0,10)}</p>
              <img src={post["thumbnail"]} />
          </section>
        </main>
      </div>
    );
  } else {
    return (
      <Forbidden />
    );
  }
}

