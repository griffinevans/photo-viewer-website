import React, {useState, useEffect }from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { queryLogin } from '../api/protectors.js';

export const Index = () => {

  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    const runLoginQuery = async () => {
      setIsLoggedIn(await queryLogin());
    }
    runLoginQuery();

    fetch('/posts/getRecentPosts')
      .then( response => response.json())
      .then( res_json => setPosts(res_json))
      .catch( err => console.log(err));

  }, []);

  return (
    <div className="index">
      <Header />
      <Navbar />
      <main id="indexMain" className="indexMain">
        <section id="splash" className="splash"> 
          {
          posts.map( (post) => (
            <a href={'/posts/'+ post["id"]} key={post.id} className="postContainer">
              <div className = "postContents">
                <img src={post["thumbnail"]} />
                <p>{post["title"]}</p>
              </div>
            </a>
          ))
          }
        </section>
      </main>
      <Footer />
    </div>
  );

}

