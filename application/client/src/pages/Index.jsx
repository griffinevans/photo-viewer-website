import React, {useState, useEffect }from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Navbar } from '../components/Navbar';

export const Index = () => {

  const [posts, setPosts] = useState([]);

  useEffect( () => {
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


          {console.log(posts)}
          {
            posts.map( (post) => (
              <a href={'/posts/'+ post["id"]} key={post.id} className="postContainer">
                <img src={post["thumbnail"]} />
                <p>{post["title"]}</p>
              </a>
            ))
          }
        </section>
      </main>
      <Footer />
    </div>
  );

}

