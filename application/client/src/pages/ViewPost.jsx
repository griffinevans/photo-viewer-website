import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { queryLogin } from '../api/protectors.js';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { Send } from 'react-feather';
import { toast } from 'react-toastify';

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
  const [comments, setComments] = useState([]);

  //on page load, check if user is logged in
  useEffect( () => {
    const runLoginQuery = async () => {
      setAuth(await queryLogin());
    }
    runLoginQuery();
  },[]);

  //load post & comments if authenticated (runs whenever auth is updated)
  useEffect( () => {
    if(auth) {
      fetch(`/api/posts/${postId}`)
        .then( response => response.json() )
        .then( res_json => setPost(res_json) )
        .catch( err => console.log(err) );

      fetch(`/api/comments/${postId}`)
        .then( response => response.json() )
        .then( res_json => setComments(res_json) )
        .catch( err => console.log(err) );
    }
  },[auth]);

  const postComment = (e) => {
    e.preventDefault();
    const commentBody = new URLSearchParams(new FormData(document.getElementById("commentForm")));

    fetch(`/api/comments/${postId}`, {
      method: 'POST',
      body: commentBody
    })
      .then( (response) => {
        if(response.ok) {
          toast.success("Comment posted");
          document.getElementById("commentForm").reset();
          window.location.reload();
        } else {
          toast.error('Error posting comment');
        }
      })
      .catch( (err) => {
        console.log(err);
        toast.error('Network error');
      });
  }

  return (
    <div>
      <Header />
      <Navbar />
      {auth &&
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
        <section className="commentBox">
          <form id="commentForm" className="commentForm" onSubmit={e => postComment(e)}>
            <input placeholder="Type a comment" type="text" name="commentInput" id="commentInput" className="commentInput" required />
            <Send className="submitComment" type="submit" onClick={e => postComment(e)} />
          </form>
          {
          comments.map( comment => (
            <div className="commentContainer" key={comment["id"]}>
              <h1 className="commentAuthor">
                {comment["username"]}
              </h1>
              <p className="date">
                {comment["createdAt"].slice(0,10)}
              </p>
              <p className="commentBody">
                {comment["text"]}
              </p>
            </div>
          ))
        }
        </section>
      </main>
      }
    </div>
  );
}

