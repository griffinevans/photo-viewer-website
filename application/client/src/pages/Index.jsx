import React, {useState, useEffect }from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Forbidden } from './Forbidden.jsx';
import { Navbar } from '../components/Navbar';
import { queryLogin } from '../api/protectors.js';
import { toast } from 'react-toastify';

export const Index = () => {

  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect( () => {
    const runLoginQuery = async () => {
      setAuth(await queryLogin());
    }
    runLoginQuery();

    fetch('/api/posts/getRecentPosts')
      .then( response => response.json())
      .then( res_json => setPosts(res_json))
      .catch( err => console.log(err));

  }, []);

  const goToPage = (postId) => {
    if(auth) {
      window.location.href=`posts/${postId}`;
    } 
    else {
      toast.error('You must be logged in to view posts', {position: "top-center", theme: "colored", autoClose: 1000});
    }
  }

  return (
    <div className="index">
      <Header />
      <Navbar />
      <main id="indexMain" className="indexMain">
        <section id="splash" className="splash"> 
          {
          posts.map( (post) => (
            <div onClick={() => goToPage(post["id"])} key={post.id} className="postContainer">
              <div className = "postContents">
                <img src={post["thumbnail"]} />
                <p>{post["title"]}</p>
              </div>
            </div>
          ))
          }
        </section>
      </main>
      <Footer />
    </div>
  );

}

